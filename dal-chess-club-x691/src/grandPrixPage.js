import React from 'react';
import { useIframeContext } from './pages/IframeContext';
import './styles/grandPrix.css';



const GrandPrixPage = () => {
  const { iframeSrc } = useIframeContext();
  console.log('Current iframe source:', iframeSrc);

  return (
    <div className='grandPrix-background'>
            <div className='grandPrix-container'>
                <h1 className='grandPrix-title'>Grand Prix Standings</h1>
                <div className="grandPrix-table"dangerouslySetInnerHTML={{ __html: iframeSrc }} />
            </div>
    </div>

  
  );
};

export default GrandPrixPage;
