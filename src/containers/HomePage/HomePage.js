import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/slider/Specialty";
import MedicalFacility from "./Section/slider/MedicalFacility";
import OutStandingDoctor from "./Section/slider/OutStandingDoctor";
import Footer from "./Section/Info/Footer";
import ReactionOfUser from "./Section/Info/ReactionOfUser";
// import HandBook from "./Section/HandBook";
import About from "./Section/About";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Base.scss";
import "./HomePage.scss";


class HomePage extends Component {
  componentDidMount() {
    document.title = "VKU Healcare - Nền tảng y tế sức khỏe toàn diện";
  }
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
        <ReactionOfUser />

        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />

        <About />
        <Footer />
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
