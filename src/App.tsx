import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { WebUser } from './types';
import { generateMobileConnection } from './service/connectionService';
import { useFlow } from './context/FlowContext';

// Your Components
import { PreConsentView } from './components/PreConsentView/PreConsentView';
import { ConsentView } from './components/ConsentView/ConsentView';
import { SuccessView } from './components/SuccessView/SuccessView';

const MOCK_USER: WebUser = { id: "WP-88293-XP", name: "John Doe" };

// Shared page chrome so every route renders inside the same container.
function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Philips Heartprint</h1>
      <hr />
      {children}
    </div>
  );
}

// `/` — always shows pre-consent; proceeding marks this entry as forwarded.
function PreConsentRoute() {
  const navigate = useNavigate();
  return (
    <PreConsentView
      onProceed={() => navigate('/consent', { state: { fromPreConsent: true } })}
    />
  );
}

// `/consent` — reachable only by forwarding from pre-consent (this history
// entry carries `fromPreConsent`, which survives refresh) or once consent was
// already accepted (e.g. returning from success). Otherwise recover to `/`.
function ConsentRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { consentAccepted, connection, acceptConsent, setConnection } = useFlow();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromPreConsent = (location.state as { fromPreConsent?: boolean } | null)?.fromPreConsent === true;
  if (!fromPreConsent && !consentAccepted) {
    return <Navigate to="/" replace />;
  }

  const handleGenerate = async () => {
    setError(null);

    // Reuse the stable, already-generated connection without regenerating.
    if (connection) {
      acceptConsent();
      navigate('/connect');
      return;
    }

    try {
      setIsGenerating(true);
      const data = await generateMobileConnection(MOCK_USER.id);
      setConnection(data);
      acceptConsent();
      navigate('/connect');
    } catch (err) {
      console.error("Failed to generate code", err);
      setError('Something went wrong while generating your connection code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return <ConsentView onGenerate={handleGenerate} isGenerating={isGenerating} error={error} />;
}

// `/connect` — requires both consent acceptance and connection data.
function ConnectRoute() {
  const navigate = useNavigate();
  const { consentAccepted, connection } = useFlow();

  if (!consentAccepted || !connection) {
    return <Navigate to="/" replace />;
  }

  return (
    <SuccessView
      connection={connection}
      onBack={() => navigate('/consent', { state: { fromPreConsent: true } })}
    />
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PreConsentRoute />} />
        <Route path="/consent" element={<ConsentRoute />} />
        <Route path="/connect" element={<ConnectRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;