import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { useIframeContext } from './IframeContext';
import '../styles/editPage.css';

const GrandPrixForm = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { updateIframeSrc } = useIframeContext();
  const [iframeCode, setIframeCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting iframe code:', iframeCode);
    updateIframeSrc(iframeCode); // Pass the entire iframe code to updateIframeSrc
    navigate('/grandPrixPage'); // Navigate to GrandPrixPage after form submission
  };

  return (
    <div className="grandPrix-form-container">
      <h1>Grand Prix</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={iframeCode}
          onChange={(e) => setIframeCode(e.target.value)}
          placeholder="Enter iframe code"
          rows={10}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GrandPrixForm;
