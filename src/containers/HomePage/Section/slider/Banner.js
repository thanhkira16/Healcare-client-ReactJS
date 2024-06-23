import React, { Component } from "react";
import { connect } from "react-redux";
import Swiper, { Navigation, Controller, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import "../scss/Banner.scss";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const parent = document.querySelector('.splitview');
    const topPanel = parent.querySelector('.top');
    const handle = parent.querySelector('.handle');
    let skewHack = 0;
    let delta = 0;

    if (parent.className.indexOf('skewed') !== -1) {
      skewHack = 1000;
    }

    parent.addEventListener('mousemove', (event) => {
      delta = (event.clientX - window.innerWidth / 2) * 0.5;
      handle.style.left = event.clientX + delta + 'px';
      topPanel.style.width = event.clientX + skewHack + delta + 'px';
    });
  }

  render() {
    return (
      <div className="splitview skewed">
        <div className="panel bottom">
          {/* <div className="content">
            <div className="description">
              <h1>The original image.</h1>
              <p>This is how the image looks like before applying a duotone effect.</p>
            </div>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/original-image.jpg"
              alt="Original"
            />
          </div> */}
        </div>

        <div className="panel top">
          <div className="content">
            <div className="description">
              <h1>The duotone image.</h1>
              <p>This is how the image looks like after applying a duotone effect.</p>
            </div>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/duotone-image.jpg"
              alt="Duotone"
            />
          </div>
        </div>

        <div className="handle"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);

