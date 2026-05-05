import type { ConnectionData } from '../../types';
import styles from './SuccessView.module.scss';

interface Props {
  connection: ConnectionData;
}

export const SuccessView = ({ connection }: Props) => {
  const triggerDeepLink = () => {
    const url = `msteams://teams.microsoft.com/`;
    console.log("Triggering Deep Link:", url);
    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <h3>Terms & Conditions</h3>
      <div className={styles.termsBox}>
        <p>By connecting, you agree to share your Heartprint data with the native mobile application...</p>
      </div>
      
      <h3>Connection Ready</h3>
      <p>Your unique mobile ID:</p>
      
      <div className={styles.idBox}>
        {connection.nativeUserId.match(/.{1,4}/g)?.join('-')}
      </div>
      
      <p className={styles.clientInfo}>Client: {connection.clientId}</p>

      <button 
        onClick={triggerDeepLink}
        className={styles.connectButton}
      >
        Connect to Native App
      </button>
    </div>
  );
};