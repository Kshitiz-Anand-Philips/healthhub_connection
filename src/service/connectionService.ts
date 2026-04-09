import type { ConnectionData } from '../types';

/**
 * Simulates a POST request to the server to generate a new mobile ID.
 */
export const generateMobileConnection = async (webUserId: string): Promise<ConnectionData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
      
      resolve({
        nativeUserId: newId,
        clientId: "PHILIPS_HPRINT_001"
      });
    }, 0); // 1.5s simulated latency, changed it to 0 for faster testing.
  });
};