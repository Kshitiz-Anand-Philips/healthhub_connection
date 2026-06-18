import type { ConnectionData } from '../types';

/**
 * Simulates a POST request to the server to generate a new mobile ID.
 */
export const generateMobileConnection = async (_webUserId: string): Promise<ConnectionData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nativeUserId: "12345678901234",
        clientId: "Careplix-internal"
      });
    }, 0); // 1.5s simulated latency, changed it to 0 for faster testing.
  });
};  