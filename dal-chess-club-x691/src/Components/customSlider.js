import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './customSlider.css';

// Import the images
import meeting from '../Images/image_1.jpg';
import resources from '../Images/image_2.jpg';
import database from '../Images/image_3.jpg';
import calendar from '../Images/image_4.jpg';
import FAQ from '../Images/image_5.jpg';

const slidesData = [
  {
    image: meeting,
    title: 'WEEKLY MEETINGS',
    subtitle: 'Monday and Thursday 5:30 PM to 8:30 PM',
  },
  {
    image: resources,
    title: 'CHESS RESOURCES',
    subtitle: 'View Available Books',
  },
  {
    image: database,
    title: 'CALENDAR',
    subtitle: 'Learn more here!',
  },
  {
    image: calendar,
    title: 'DATABASE',
    subtitle: 'Learn more here!',
  },
  {
    image: FAQ,
    title: 'LOOKING TO JOIN US?',
    subtitle: 'Sign up for our Mailing List',
  },
];

function CustomSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className='custom-slider-container'>
      {slidesData.map((slide, index) => (
        <div key={index} className="custom-slider-item">
          <div className="image-wrapper">
  <img className="image" src={slide.image} alt={slide.title} />
</div>
<div className="text-overlay">
  <h3>{slide.title}</h3>
  <p>{slide.subtitle}</p>
</div>

        </div>
      ))}
    </Slider>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick} />
  );
}

export default CustomSlider;
