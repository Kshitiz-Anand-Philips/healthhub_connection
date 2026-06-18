import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ConnectionData, FlowState } from '../types';
import { clearFlow, readFlow, writeFlow } from '../service/flowStorage';

interface FlowContextValue {
  consentAccepted: boolean;
  connection: ConnectionData | null;
  acceptConsent: () => void;
  setConnection: (connection: ConnectionData) => void;
  reset: () => void;
}

const FlowContext = createContext<FlowContextValue | null>(null);

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from sessionStorage so the flow survives refreshes.
  const [state, setState] = useState<FlowState>(() => readFlow());

  const acceptConsent = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, consentAccepted: true };
      writeFlow(next);
      return next;
    });
  }, []);

  const setConnection = useCallback((connection: ConnectionData) => {
    setState((prev) => {
      const next = { ...prev, connection };
      writeFlow(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearFlow();
    setState({ consentAccepted: false, connection: null });
  }, []);

  const value = useMemo<FlowContextValue>(
    () => ({
      consentAccepted: state.consentAccepted,
      connection: state.connection,
      acceptConsent,
      setConnection,
      reset,
    }),
    [state, acceptConsent, setConnection, reset],
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useFlow(): FlowContextValue {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error('useFlow must be used within a FlowProvider');
  return ctx;
}
