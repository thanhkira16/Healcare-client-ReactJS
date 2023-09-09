import React, { Component } from "react";
import { connect } from "react-redux";
// import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-common section-handbook">
        <div className="section-header">
          <span className="title-section">common</span>
          <button className="btn-section">See more</button>
        </div>

        <div className="section-body">
          <Slider {...this.props.settings}>
            <div className="section-custiomize">
              <div className="bg-img section-handbook"></div>
              <div>Bệnh viện Hữu nghị Việt Đức 1</div>
            </div>
            <div className="section-custiomize">
              <div className="bg-img section-handbook"></div>
              <div>Bệnh viện Hữu nghị Việt Đức 2</div>
            </div>
            <div className="section-custiomize">
              <div className="bg-img section-handbook"></div>
              <div>Bệnh viện Hữu nghị Việt Đức 3</div>
            </div>
            <div className="section-custiomize">
              <div className="bg-img section-handbook"></div>
              <div>Bệnh viện Hữu nghị Việt Đức 4</div>
            </div>
            <div className="section-custiomize">
              <div className="bg-img section-handbook"></div>
              <div>Bệnh viện Hữu nghị Việt Đức 5</div>
            </div>
            <div className="section-custiomize">
              <div className="bg-img section-handbook"></div>
              <div>Bệnh viện Hữu nghị Việt Đức 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
