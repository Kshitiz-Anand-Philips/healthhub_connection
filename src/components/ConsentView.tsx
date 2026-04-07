import { useState } from 'react';

interface Props {
  onGenerate: () => void;
}

export const ConsentView = ({ onGenerate }: Props) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div>
      <h3>Terms & Conditions</h3>
      <div style={{ height: '150px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', fontSize: '14px' }}>
        <p>By connecting, you agree to share your Heartprint data with the native mobile application...</p>
      </div>
      
      <label style={{ display: 'block', marginTop: '20px' }}>
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
        style={{ marginTop: '20px', width: '100%', padding: '10px', backgroundColor: isAgreed ? '#0066A1' : '#ccc', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Generate Connection Code
      </button>
    </div>
  );
};