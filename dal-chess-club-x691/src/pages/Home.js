import {
  Card,
  Carousel,
  Col,
  Container,
  Dropdown,
  Image,
  Row,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/homestyle.css";
import slide1Image1 from "../Images/dal_carousel.jpg";
import slide1Image2 from "../Images/dal_counter.jpg";
import slide1Image3 from "../Images/dal_chessboard.jpeg";

import slide1Image11 from "../Images/image_3.jpg";
import slide1Image12 from "../Images/image_4.jpg";
import slide1Image13 from "../Images/image_6.jpg";

function Home() {
  return (
    <>
      <Container className="mt-5">
        <Carousel>
          <Carousel.Item style={{ maxHeight: "600px" }}>
            <Image src={slide1Image1} className="d-block w-100" fluid="true" />
            <Carousel.Caption>
              <h3>WELCOME TO THE DALHOUSIE CHESS CLUB</h3>
              <p>Bringing Together Chess Players at Dalhousie University</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "600px" }}>
            <Image src={slide1Image2} className="d-block w-100" fluid="true" />
            <Carousel.Caption>
              <h3>CHESS FEST</h3>
              <p>Our Recent Seminar on Chess Strategies was a Great Success</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ maxHeight: "600px" }}>
            <Image src={slide1Image3} className="d-block w-100" fluid="true" />
            <Carousel.Caption>
              <h3>UPCOMING TOURNAMENTS</h3>
              <p>Follow Us on Social Media to Learn More About Upcoming Events</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container className="my-5">
        <Row>
          <Col md={4} className="mt-3">
            <Card>
              <div className="image-container">
                <NavLink to="/page">
                  <Card.Img
                    variant="top"
                    src={slide1Image11}
                    className="zoom-image"
                    style={{ height: "235px" }}
                    fluid="true"
                  />
                </NavLink>
              </div>
              <Card.Body>
                <Card.Title>WEEKLY MEETINGS</Card.Title>
                <Card.Text>
                  Join Us on Mondays and Thursdays from 5.30 to 8.30
                </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mt-3">
            <Card>
              <div className="image-container">
                <NavLink to="/page">
                  <Card.Img
                    variant="top"
                    src={slide1Image12}
                    className="zoom-image"
                    style={{ height: "235px" }}
                    fluid="true"
                  />
                </NavLink>
              </div>
              <Card.Body>
                <Card.Title>MEET OUR TEAM</Card.Title>
                <Card.Text>
                  Learn More About our 2024 Team Members 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mt-3">
            <Card>
              <div className="image-container">
                <NavLink to="/page">
                  <Card.Img
                    variant="top"
                    src={slide1Image13}
                    className="zoom-image"
                    style={{ height: "235px" }}
                    fluid="true"
                  />
                </NavLink>
              </div>
              <Card.Body>
                <Card.Title>FAQ PAGE</Card.Title>
                <Card.Text>
                  Get Answers to Frequently Asked Questions
                </Card.Text>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
