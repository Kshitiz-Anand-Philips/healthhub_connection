import { useState } from 'react';
// Check this import path to make sure it points to your types file
import type { PageStep, ConnectionData, WebUser } from './types'; 
import { generateMobileConnection } from './service/connectionService';

// Your Components
import { PreConsentView } from './components/PreConsentView/PreConsentView';
import { ConsentView } from './components/ConsentView/ConsentView';
import { SuccessView } from './components/SuccessView/SuccessView';

const MOCK_USER: WebUser = { id: "WP-88293-XP", name: "John Doe" };

function App() {
  // 1. Start the state at 'PRE_CONSENT'
  const [step, setStep] = useState<PageStep>('PRE_CONSENT');
  const [connection, setConnection] = useState<ConnectionData | null>(null);

  const handleGenerateCode = async () => {
    try {
      setStep('GENERATING');
      const data = await generateMobileConnection(MOCK_USER.id);
      setConnection(data);
      setStep('CONNECTION');
    } catch (error) {
      console.error("Failed to generate code", error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Philips Heartprint</h1>
      <hr />

      {/* 2. Render the Gatekeeper first */}
      {step === 'PRE_CONSENT' && (
        <PreConsentView onProceed={() => setStep('CONSENT')} />
      )}

      {/* 3. The rest of the flow remains identical */}
      {step === 'CONSENT' && (
        <ConsentView onGenerate={handleGenerateCode} />
      )}
      
      {step === 'GENERATING' && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Generating secure 14-digit code...</p>
        </div>
      )}
      
      {step === 'CONNECTION' && connection && (
        <SuccessView connection={connection} />
      )}
    </div>
  );
}

export default App;