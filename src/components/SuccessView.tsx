import type { ConnectionData } from '../types';

interface Props {
  connection: ConnectionData;
}

export const SuccessView = ({ connection }: Props) => {
  const triggerDeepLink = () => {
    const url = `whatsapp://send?text=Your%20ID%20is%3A%20${connection.nativeUserId}`;
    console.log("Triggering Deep Link:", url);
    window.location.href = url;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Terms & Conditions</h3>
      <div style={{ height: '150px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', fontSize: '14px' }}>
        <p>By connecting, you agree to share your Heartprint data with the native mobile application...</p>
      </div>
      <h3>Connection Ready</h3>
      <p>Your unique mobile ID:</p>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', fontSize: '20px', letterSpacing: '2px', fontWeight: 'bold', fontFamily: 'monospace' }}>
        {connection.nativeUserId.match(/.{1,4}/g)?.join('-')}
      </div>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Client: {connection.clientId}</p>

      <button 
        onClick={triggerDeepLink}
        style={{ marginTop: '30px', width: '100%', padding: '15px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
      >
        Connect to Native App
      </button>
    </div>
  );
};