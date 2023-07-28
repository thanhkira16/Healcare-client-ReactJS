import React, { Component } from "react";
import { connect } from "react-redux";
// import "./Spicialty.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-common section-specialty">
        <div className="common-header">
          <span className="title-section">Specialty</span>
          <button className="btn-section">See more</button>
        </div>

        <div className="common-body">
          <Slider {...this.props.settings}>
            <div className="common-custiomize">
              <div className="bg-img"></div>
              <div>Heloo 1</div>
            </div>
            <div className="common-custiomize">
              <div className="bg-img"></div>
              <div>Heloo 2</div>
            </div>
            <div className="common-custiomize">
              <div className="bg-img"></div>
              <div>Heloo 3</div>
            </div>
            <div className="common-custiomize">
              <div className="bg-img"></div>
              <div>Heloo 4</div>
            </div>
            <div className="common-custiomize">
              <div className="bg-img"></div>
              <div>Heloo 5</div>
            </div>
            <div className="common-custiomize">
              <div className="bg-img"></div>
              <div>Heloo 6</div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
