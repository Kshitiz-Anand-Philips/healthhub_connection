// Updated hook import path to go up two levels!
import { useDeviceOS } from '../../hooks/useDeviceOs';
import styles from './PreConsentView.module.scss';

interface Props { 
  onProceed: () => void; 
}

export const PreConsentView = ({ onProceed }: Props) => {
  const os = useDeviceOS();
  const appleStoreLink = "https://apps.apple.com/in/app/careplix-healthhub/id6748461817";
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.careplix.hhub";

  return (
    <div className={styles.container}>
      <h3>Let's get connected</h3>
      
      <div className={styles.stepBox}>
        <p>Step 1: Get the App</p>
        
        {(os === 'android' || os === 'desktop') && (
          <a href={playStoreLink} target="_blank" rel="noreferrer">
            <button className={styles.storeButton}>Download on Google Play</button>
          </a>
        )}

        {(os === 'ios' || os === 'desktop') && (
          <a href={appleStoreLink} target="_blank" rel="noreferrer">
            <button className={styles.storeButton}>Download on the App Store</button>
          </a>
        )}
      </div>

      <div className={styles.actionBox}>
        <p style={{ fontWeight: 'bold' }}>Step 2: Connect</p>
        <button className={styles.primaryButton} onClick={onProceed}>
          I have the app - Proceed to Consent
        </button>
      </div>
    </div>
  );
};