import { useState, useEffect } from 'react';

type OS = 'ios' | 'android' | 'desktop' | 'unknown';

export const useDeviceOS = (): OS => {
  const [os, setOs] = useState<OS>('unknown');

  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor;

    if (/android/i.test(userAgent)) {
      setOs('android');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setOs('ios');
    } else {
      setOs('desktop'); 
    }
  }, []);

  return os;
};