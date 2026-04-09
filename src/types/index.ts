export type PageStep = 'PRE_CONSENT' | 'CONSENT' | 'GENERATING' | 'CONNECTION';

export interface ConnectionData {
  nativeUserId: string;
  clientId: string;
}

export interface WebUser {
  id: string;
  name: string;
}