import React from 'react';
import { Link } from 'react-router-dom';
import './about-us.css';
import members from '../images/members.png';

function AboutUsPage() {

  // const redirectToFAQPage = () => {
  //   window.location.href = './faq.js'; 
  // };

  return (
    
    <div>
      <div className="about-us">
        <h1>About Us</h1>
        {/* <div id="redirect-faq">
        <button onClick={redirectToFAQPage}>See FAQ</button>
      </div> */}
      {/* <Link id="redirect-faq" to={"/faq"}>FAQ Page</Link> */}
      </div>

      <div className="members">
        <h2 id="member-header">Our Proud Members</h2>
        <p id="members-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur. Aliquam fringilla elit faucibus, suscipit
          erat varius, pretium leo. Cras auctor velit vel malesuada bibendum. In hac habitasse platea dictumst. Proin 
          fringilla massa porttitor mauris rutrum, sit amet semper orci laoreet. Phasellus eu fermentum risus, sodales
          porta tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur sed sem ut neque luctus euismod.
        </p>
      </div>

      <div className="member">
        <h2 className="position">President</h2>
        <div className='member-info'>
        <img
            src={members}
            alt="Members official pictures placeholder"
            className="members-placeholder"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
            Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
            Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
            Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p>
        </div>
      </div>

      <div className="member">
        <h2 className="position">Representative</h2>
        <div className='member-info'>
        <img
            src={members}
            alt="Members official pictures placeholder"
            className="members-placeholder"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
            Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
            Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
            Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p>
        </div>
      </div>

      <div className="member">
        <h2 className="position">Treasurer</h2>
        <div className='member-info'>
        <img
            src={members}
            alt="Members official pictures placeholder"
            className="members-placeholder"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
            Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
            Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
            Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p>
        </div>
      </div>



      {/* <div className="member-info">
      <div className='member-position-image'>
      <img
          src={members}
          alt="Members official pictures placeholder"
          className="membersPlaceholder"
        />
        <h2 className="position">Vice President</h2>
      </div>
      <div className="member-description">
        <p3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p3>
      </div>
      </div>

      <div className="member-info">
      <div className='member-position-image'>
      <img
          src={members}
          alt="Members official pictures placeholder"
          className="membersPlaceholder"
        />
        <h2 className="position">Treasurer</h2>
      </div>
      <div claassName="member-description">
        <p3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur.</p3>
      </div>
      </div> */}
      
      <div id="other-info-section">
        <h2>Who Are We?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur. Aliquam fringilla elit faucibus, suscipit
          erat varius, pretium leo. Cras auctor velit vel malesuada bibendum. In hac habitasse platea dictumst. Proin 
          fringilla massa porttitor mauris rutrum, sit amet semper orci laoreet. Phasellus eu fermentum risus, sodales
          porta tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur sed sem ut neque luctus euismod.
          </p>

          <h2>Our History</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus enim id ante consequat sodales. 
          Sed consectetur tincidunt risus quis laoreet. Sed volutpat volutpat sapien, vel efficitur mauris imperdiet in. 
          Sed ac lorem sit amet enim interdum convallis id sit amet massa. Sed consectetur turpis vitae pretium dignissim. 
          Aenean et ex tortor. Integer pellentesque dolor in finibus efficitur. Aliquam fringilla elit faucibus, suscipit
          erat varius, pretium leo. Cras auctor velit vel malesuada bibendum. In hac habitasse platea dictumst. Proin 
          fringilla massa porttitor mauris rutrum, sit amet semper orci laoreet. Phasellus eu fermentum risus, sodales
          porta tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur sed sem ut neque luctus euismod.
          </p>
      </div>

    </div>
  )
}

export default AboutUsPage;



















// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
