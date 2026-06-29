import type { ConnectionData, FlowState } from '../types';

const STORAGE_KEY = 'heartprint.flow';

const EMPTY_FLOW: FlowState = { consentAccepted: false, connection: null };

function isValidConnection(value: unknown): value is ConnectionData {
  if (!value || typeof value !== 'object') return false;
  const c = value as Record<string, unknown>;
  return typeof c.nativeUserId === 'string' && typeof c.clientId === 'string';
}

// Reads flow state from sessionStorage. Any malformed or partial data is
// treated as invalid: it is cleared and an empty flow is returned.
export function readFlow(): FlowState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_FLOW;

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const consentAccepted = parsed.consentAccepted === true;
    const connection = isValidConnection(parsed.connection) ? parsed.connection : null;
    
    return { consentAccepted, connection };
  } catch {
    clearFlow();
    return EMPTY_FLOW;
  }
}

export function writeFlow(state: FlowState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (e.g. private mode); flow falls back to in-memory state.
  }
}
 
export function clearFlow(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
