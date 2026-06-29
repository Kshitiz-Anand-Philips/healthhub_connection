import { useState, useEffect, useRef } from 'react';
import type { ConnectionData } from '../../types';
import { useDeviceOS } from '../../hooks/useDeviceOs';
import styles from './SuccessView.module.scss';

const APPLE_STORE_URL = "https://apps.apple.com/in/app/careplix-healthhub/id6748461817";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.careplix.hhub";
const FALLBACK_TIMEOUT_MS = 1500;

type LinkStatus = 'idle' | 'attempted' | 'failed';

interface Props {
  connection: ConnectionData;
}

export const SuccessView = ({ connection }: Props) => {
  const os = useDeviceOS();
  const [linkStatus, setLinkStatus] = useState<LinkStatus>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appOpenedRef = useRef(false);

  // Cleanup any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }; 
  }, []);

  // Items 1-3: Anchor-click deep link + visibility/blur detection + timeout fallback
  const triggerDeepLink = () => {
    const url = `cphhub://exchange?client_id=${encodeURIComponent(connection.clientId)}&token=${encodeURIComponent(connection.nativeUserId)}`;

    appOpenedRef.current = false;
    setLinkStatus('attempted');

    // Item 2: If page becomes hidden or window loses focus, the OS switched to the app
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') markOpened();
    }
    function onBlur() { markOpened(); }

    function markOpened() {
      appOpenedRef.current = true;
      removeListeners();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setLinkStatus('idle');
    }

    function removeListeners() {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('pagehide', onBlur);
    }

    // Item 3: Attach visibility and focus listeners
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onBlur);
    window.addEventListener('pagehide', onBlur);

    // Item 2: If none of the above fires within the window, assume the app did not open
    timeoutRef.current = setTimeout(() => {
      removeListeners();
      if (!appOpenedRef.current) setLinkStatus('failed');
    }, FALLBACK_TIMEOUT_MS);

    // Item 1: Anchor-click is more reliably treated as a user-gesture navigation
    // across mobile browsers and iOS PWA than window.location.assign()
    const a = document.createElement('a');
    a.href = url;
    a.click();
  };

  // Item 10: Desktop – deep linking is impossible; guide the user to open on mobile
  if (os === 'desktop') {
    return (
      <div className={styles.container}>
        <div className={styles.desktopWarning}>
          <h3>📱 Mobile Device Required</h3>
          <p>Deep linking only works on a mobile device with the Careplix HealthHub app installed.</p>
          <p className={styles.mobileOpenLabel}>Open this page on your phone to continue:</p>
          <div className={styles.urlBox}>{window.location.href}</div>
          <button
            type="button"
            className={styles.copyUrlButton}
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>Connection Ready</h3>
      <p>Your unique mobile ID:</p>

      <div className={styles.idBox}>
        {connection.nativeUserId.match(/.{1,4}/g)?.join('-')}
      </div>

      <p className={styles.clientInfo}>Client: {connection.clientId}</p>

      {/* Items 1-3: Primary connect button; disabled while the app-open check is in flight */}
      {linkStatus !== 'failed' && (
        <button
          type="button"
          onClick={triggerDeepLink}
          className={styles.connectButton}
          disabled={linkStatus === 'attempted'}
        >
          {linkStatus === 'attempted' ? 'Opening App...' : 'Connect to HealthHub!'}
        </button>
      )}

      {/* Items 4 & 6: Fallback UI – shown only after the timeout fires without app opening */}
      {linkStatus === 'failed' && (
        <div className={styles.fallbackContainer}>
          <p className={styles.fallbackTitle}>The app did not open automatically.</p>

          {/* Item 6: Retry */}
          <button type="button" onClick={triggerDeepLink} className={styles.retryButton}>
            Try Opening App Again
          </button>

          {/* Item 4: Platform-specific store redirect */}
          {os === 'ios' && (
            <a href={APPLE_STORE_URL} target="_blank" rel="noreferrer" className={styles.storeLink}>
              <button type="button" className={styles.storeButton}>
                Get it on the App Store
              </button>
            </a>
          )}
          {os === 'android' && (
            <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className={styles.storeLink}>
              <button type="button" className={styles.storeButton}>
                Get it on Google Play
              </button>
            </a>
          )}
        </div>
      )}

    </div>
  );
};