export interface ConnectionData {
  nativeUserId: string;
  clientId: string;
}

// Durable, frontend-owned flow state persisted in sessionStorage.
// Both fields are required together for the success route to render.
export interface FlowState {
  consentAccepted: boolean;
  connection: ConnectionData | null;
}

export interface WebUser {
  id: string;
  name: string;
}