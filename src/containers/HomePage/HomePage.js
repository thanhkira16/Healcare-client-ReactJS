import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/slider/Specialty";
import MedicalFacility from "./Section/slider/MedicalFacility";
import OutStandingDoctor from "./Section/slider/OutStandingDoctor";
// import HandBook from "./Section/HandBook";
import About from "./Section/About";
import Footer from "./Section/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Base.scss";
import "./HomePage.scss";
import Carousel from "./Section/slider/Carousel";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    console.log("Scrolling...");
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    console.log("Effect is running...");
    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("Cleanup...");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? "visible" : "hidden"}`}
      onClick={scrollToTop}
    >
      Go to Top
    </button>
  );
};
class HomePage extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
      initialSlide: 0,
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
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
    return (
      <>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        {/* <HandBook settings={settings} /> */}
        <Carousel></Carousel>
        <About />
        <Footer />
        <ScrollToTopButton />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
