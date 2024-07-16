import React, { useState, useEffect } from "react";
import './styles/grandPrix.css';
import { BASE_URL } from "./config";

function GrandPrixPage() {
  const [grandPrixIframe, setGrandPrixIframe] = useState('');
  const itemId = 1; // Fetch data for id 1

  useEffect(() => {
    fetchData(itemId);
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/grand-prix/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGrandPrixIframe(data.iframe_link); // Ensure this matches the key sent by your backend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="tpopup-background">
      <div className="ttables">
        <h1>Grand Prix</h1>
        <div className="tstandings-table" dangerouslySetInnerHTML={{ __html: grandPrixIframe }}></div>
      </div>
    </div>
  );
}

export default GrandPrixPage;
