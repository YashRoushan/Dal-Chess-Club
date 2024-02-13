import React from 'react';
import './about-us.css';
import members from '../images/members.png';

function AboutUsPage() {

  return (
    
    <div>
      <div className="about-us">
        <h1>About Us</h1>
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