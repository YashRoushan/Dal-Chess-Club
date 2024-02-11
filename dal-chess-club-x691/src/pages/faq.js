import React from 'react';
import { Link } from 'react-router-dom';
// import './about-us.css';
import members from '../images/members.png';


function FAQpage() {

//   const redirectToFAQPage = () => {
//     window.location.href = './faq.js';
//   };

  return (
    
    <div>
      <div className="faq">
        <h1>Frequently Asked Questions</h1>

        <div id="redirect-faq">
        <button onClick={redirectToFAQPage}>See About Us</button>
      </div>

      </div>

      <h2>Question 1</h2>
      <p3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p3>

      <h2>Question 2</h2>    
      <p3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p3>

      <h2>Question 2</h2>      
      <p3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p3>    

    </div>
  )
}

export default FAQpage;




