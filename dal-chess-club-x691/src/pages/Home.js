import { NavLink } from "react-router-dom";
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";


import { Navigation, Pagination, HashNavigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import slide1Image1 from "../images/slide-1.jpg";
import slide1Image2 from "../images/slide-2.jpeg";
import slide1Image3 from "../images/slide-3.jpg";

import slide1Image11 from "../images/slide-1.jpg";
import slide1Image12 from "../images/slide-2.jpeg";
import slide1Image13 from "../images/slide-3.jpg";
import '../styles/homestyle.css'

function Home() {

  return (
    <>
      {/* swiper-slider container */}
      <div className="sliderMain">
      <Swiper
  spaceBetween={0}
  hashNavigation={{
    watchState: true,
  }}
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Pagination, Navigation, HashNavigation, Autoplay]} 
  autoplay={{
    delay: 4000,  // Adjust the delay as needed
    disableOnInteraction: false,
  }}
  loop={true}
  className="mySwiper"
>
          <SwiperSlide data-hash="slide1">

            <div className="innerContent">
              <img src={slide1Image1} alt=""/>
              <div>
              <h1>WELCOME TO THE DAL CHESS CLUB</h1>
              <p>
                Bringing Together Players at Dalhousie University
              </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide data-hash="slide2">
          <div className="innerContent">
              <img src={slide1Image2} alt=""/>
              <div>
              <h1>CHESS FEST</h1>
              <p>
              Our Recent Seminar on Strategies was a Great Success
              </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide data-hash="slide3">
          <div className="innerContent">
              <img src={slide1Image3} alt=""/>
              <div>
              <h1>UPCOMING TOURNAMENTS</h1>
              <p>
              Follow Us on Social Media to Learn More About Upcoming Events
              </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>


      {/* cards-material ui */}
      <Container className="my-5">
        <Grid container spacing={3} className="cardCenter">
          <Grid item md={4} className="mt-3">
            <Card>
              <CardActionArea id="cardHover" component={NavLink} to="/page">
                <CardMedia id="cardimg"
                  component="img"
                  alt="WEEKLY MEETINGS"
                  height="235"
                  image={slide1Image11}
                  title="WEEKLY MEETINGS"
                />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  WEEKLY MEETINGS
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join Us on Mondays and Thursdays from 5.30 to 8.30
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} className="mt-3">
            <Card>
              <CardActionArea id="cardHover" component={NavLink} to="/about-us">
                <CardMedia
                  id="cardimg"
                  component="img"
                  alt="MEET OUR TEAM"
                  height="235"
                  image={slide1Image12}
                  title="MEET OUR TEAM"
                />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  MEET OUR TEAM
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn More About our 2024 Team Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} className="mt-3">
            <Card>
              <CardActionArea id="cardHover" component={NavLink} to="/faq">
                <CardMedia
                  id="cardimg"
                  component="img"
                  alt="FAQ PAGE"
                  height="235"
                  image={slide1Image13}
                  title="FAQ PAGE"
                />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  FAQ PAGE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get Answers to Frequently Asked Questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

    </>
  );
}

export default Home;