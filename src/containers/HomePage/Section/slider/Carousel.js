import React, { Component } from "react";
import Slider from "react-slick";
import Card from "../card/Card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/Carousel.scss";
import DoctorCard from "../card/DoctorCard";
class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      slides: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.slides !== this.props.slides) {
      this.setState({ slides: this.props.slides });
    }
  }
  componentDidMount() {
    if (this.props.slides && this.props.slides.length > 0) {
      this.setState({ slides: this.props.slides });
    }
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
    console.log("check props", this.props);
    console.log("check state", this.state);
    console.log("check props", this.props);

    return (
      <div className="container" style={this.props.backgroundColor}>
        <h2> Responsive Product Carousel</h2>
        <Slider {...settings}>
          {this.state.slides.map((slide, index) => {
            return (
              <div key={index}>
                <DoctorCard slide={slide} />
                {/* <img src={slide.img} alt={`slide${index}`} /> */}
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
