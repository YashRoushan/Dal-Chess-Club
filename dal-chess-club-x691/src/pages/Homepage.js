// src/pages/Homepage.js
import React from 'react';
import ImageCarousel from '../Components/imageCarousel';
import CustomSlider from '../Components/customSlider';
import { InstagramEmbed } from 'react-social-media-embed';




const HomePage = () => {
  return (
    <div>
      <div>
        <ImageCarousel/>
      </div>  
      <div className="custom-slider-container">
      <CustomSlider/>
      </div>
      <div className="image-carousel">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <InstagramEmbed url="https://www.instagram.com/dalchess/" width={328} />
</div>
</div>
  </div>
    
  );
};

export default HomePage;
