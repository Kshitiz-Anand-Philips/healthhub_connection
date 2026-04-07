import { useState } from 'react';
import type { PageStep, ConnectionData, WebUser } from './types';
import { generateMobileConnection } from './service/connectionService';
import { ConsentView } from './components/ConsentView';
import { SuccessView } from './components/SuccessView';

const MOCK_USER: WebUser = { id: "WP-88293-XP", name: "John Doe" };

function App() {
  const [step, setStep] = useState<PageStep>('CONSENT');
  const [connection, setConnection] = useState<ConnectionData | null>(null);

  const handleGenerateCode = async () => {
    try {
      setStep('GENERATING');
      
      // Await the response from our service (API)
      const data = await generateMobileConnection(MOCK_USER.id);
      
      setConnection(data);
      setStep('CONNECTION');
    } catch (error) {
      console.error("Failed to generate code", error);
      // Here you would handle a target error state
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Philips Heartprint</h1>
      <hr />

      {step === 'CONSENT' && <ConsentView onGenerate={handleGenerateCode} />}
      
      {step === 'GENERATING' && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Generating secure 14-digit code...</p>
        </div>
      )}
      
      {step === 'CONNECTION' && connection && <SuccessView connection={connection} />}
    </div>
  );
}

export default App;