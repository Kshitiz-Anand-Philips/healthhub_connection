import { useState } from 'react'

// 1. Define the possible UI states
type PageStep = 'CONSENT' | 'GENERATING' | 'CONNECTION';

// 2. Define the shape of the connection data
interface ConnectionData {
  nativeUserId: string;
  clientId: string;
}

// 3. Mock Web User (the starting point)
const MOCK_WEB_USER = {
  id: "WP-88293-XP",
  name: "John Doe"
};

function App() {
  const [step, setStep] = useState<PageStep>('CONSENT');
  
  // Tracks if the T&C checkbox is ticked
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  
  // Stores the generated ID once the "server" returns it
  const [connection, setConnection] = useState<ConnectionData | null>(null);

  const handleGenerateCode = () => {
    setStep('GENERATING');

    // Simulate API Latency (1.5 seconds)
    setTimeout(() => {
      const newId = Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
      
      setConnection({
        nativeUserId: newId,
        clientId: "PHILIPS_HPRINT_001" // Mock Client ID
      });
      
      setStep('CONNECTION');
    }, 1500);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Philips Heartprint</h1>
      <hr />

      {step === 'CONSENT' && (
        <div>
          <h3>Terms & Conditions</h3>
          <div style={{ height: '150px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', fontSize: '14px' }}>
            <p>By connecting, you agree to share your Heartprint data with the native mobile application...</p>
            <p>More legal text here...</p>
          </div>
          
          <label style={{ display: 'block', marginTop: '20px' }}>
            <input 
              type="checkbox" 
              checked={isAgreed} 
              onChange={(e) => setIsAgreed(e.target.checked)} 
            />
            I agree to the terms and conditions
          </label>

          <button 
            disabled={!isAgreed}
            onClick={handleGenerateCode}
            style={{ marginTop: '20px', width: '100%', padding: '10px', backgroundColor: isAgreed ? '#0066A1' : '#ccc', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Generate Connection Code
          </button>
        </div>
      )}

      {step === 'GENERATING' && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Generating secure 14-digit code...</p>
          {/* You could add a CSS spinner here later */}
        </div>
      )}

      {step === 'CONNECTION' && connection && (
      
        <div style={{ textAlign: 'center' }}>
          <h3>Terms & Conditions</h3>
          <div style={{ height: '150px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', fontSize: '14px' }}>
            <p>By connecting, you agree to share your Heartprint data with the native mobile application...</p>
            <p>More legal text here...</p>
          </div>
          <h3>Connection Ready</h3>
          <p>Your unique mobile ID:</p>
          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', fontSize: '20px', letterSpacing: '2px', fontWeight: 'bold', fontFamily: 'monospace' }}>
            {connection.nativeUserId.match(/.{1,4}/g)?.join('-')}
          </div>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Client: {connection.clientId}</p>

          <button 
            onClick={() => window.location.href = `heartprint://connect?id=${connection.nativeUserId}&client=${connection.clientId}`}
            style={{ marginTop: '30px', width: '100%', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
          >
            Connect to Native App
          </button>
        </div>
      )}
    </div>
  )
}

export default App