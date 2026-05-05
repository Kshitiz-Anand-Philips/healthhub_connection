import { useState } from 'react';
import styles from './ConsentView.module.scss';

interface Props { 
  onGenerate: () => void; 
}

export const ConsentView = ({ onGenerate }: Props) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div>
      <h3>Terms & Conditions</h3>
      <div className={styles.termsBox}>
        <p>By connecting, you agree to share your Heartprint data with the native mobile application...</p>
      </div>
      
      <label className={styles.agreementLabel}>
        <input 
          type="checkbox" 
          checked={isAgreed} 
          onChange={(e) => setIsAgreed(e.target.checked)} 
        />
        I agree to the terms and conditions
      </label>

      <button 
        disabled={!isAgreed}
        onClick={onGenerate}
        className={styles.submitButton}
        style={{ backgroundColor: isAgreed ? '#0066A1' : '#ccc' }}
      >
        Generate Connection Code
      </button>
    </div>
  );
};