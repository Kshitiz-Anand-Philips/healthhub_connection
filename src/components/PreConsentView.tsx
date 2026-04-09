import { useDeviceOS } from '../hooks/useDeviceOs';

interface Props {
  onProceed: () => void;
}

export const PreConsentView = ({ onProceed }: Props) => {
  const os = useDeviceOS();

  const appleStoreLink = "https://apps.apple.com/in/app/careplix-healthhub/id6748461817";
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.careplix.hhub&referrer=utm_source%3Dappbrain%26utm_medium%3Dappbrain_web%26utm_campaign%3Dappbrain_web&pli=1";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Let's get connected</h3>
      
      <div style={{ padding: '15px', border: '1px dashed #ccc', marginBottom: '20px' }}>
        <p style={{ fontWeight: 'bold' }}>Step 1: Get the App</p>
        
        {/* Android Only */}
        {os === 'android' && (
          <a href={playStoreLink} target="_blank" rel="noreferrer">
            <button style={{ padding: '10px', width: '100%' }}>Download on Google Play</button>
          </a>
        )}

        {/* iOS Only */}
        {os === 'ios' && (
          <a href={appleStoreLink} target="_blank" rel="noreferrer">
            <button style={{ padding: '10px', width: '100%' }}>Download on the App Store</button>
          </a>
        )}

        {/* Desktop Fallback: Show Both */}
        {os === 'desktop' && (
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              Please download the HealthHub app on your mobile device to continue.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={appleStoreLink} target="_blank" rel="noreferrer">
                <button style={{ padding: '10px', width: '100%' }}>Download on the App Store</button>
              </a>
              <a href={playStoreLink} target="_blank" rel="noreferrer">
                <button style={{ padding: '10px', width: '100%' }}>Download on Google Play</button>
              </a>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '15px', border: '1px solid #ccc' }}>
        <p style={{ fontWeight: 'bold' }}>Step 2: Connect</p>
        <button 
          onClick={onProceed}
          style={{ padding: '10px', width: '100%', backgroundColor: '#0066A1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          I have the app - Proceed to Consent
        </button>
      </div>
    </div>
  );
};