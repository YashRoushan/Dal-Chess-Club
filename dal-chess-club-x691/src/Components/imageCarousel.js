// ImageCarousel.js

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./imageCarousel.css"; // Ensure this points to the correct path for your CSS file

// Import images
import dalCampus from '../Images/dal_campus.jpg'; // Update the paths to your images
import chessFest from '../Images/chess_fest.jpg';
import chessProfile from '../Images/chess_profile.jpg';
import chessTournament from '../Images/chess_tournament.jpg';
import dalCounter from '../Images/dal_counter.jpg';

// Define your images and text for the carousel here
const images = [
  {
    src: dalCampus,
    title: 'WELCOME TO DALHOUSIE CHESS CLUB',
    subtitle: 'Bringing together Chess Players at Dalhousie University'
  },
  {
    src: chessFest,
    title: 'CHESS FEST',
    subtitle: 'Join the Chess Tournament on February 9TH'
  },
  {
    src: chessProfile,
    title: 'PREVIOUS TOURNAMENTS',
    subtitle: 'Details of the news'
  },
  {
    src: chessTournament,
    title: 'COMPETE',
    subtitle: 'Enter the Tournament'
  },
  {
    src: dalCounter,
    title: 'MEET OUR TEAM',
    subtitle: 'Members Information'
  },
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="image-carousel">
      <Slider {...settings}>
        {images.map((image, idx) => (
          <div key={idx} className="image-container">
            <img src={image.src} alt={`Slide ${idx}`} />
            <div className="text-overlay">
              <h3>{image.title}</h3>
              <p>{image.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
