import React, { Component } from "react";
import { connect } from "react-redux";
import YouTube from "react-youtube";
class About extends Component {
  changeLanguage(language) {
    this.props.changeLanguageAppRedux(language);
  }
  render() {
    return (
      <React.Fragment>
        <div className="about">
          <div className="grid">
            <h4 className="about-title">Truyền thông nói về BookingCare</h4>
            <div className="row">
              <div className="video col-6">
                <YouTube videoId="FyDQljKtWnI" />
              </div>
              <ul className="social-list col-6">
                <li className="social-item">
                  <a href="#" target="_blank" className="social-link"></a>
                </li>

                <li className="social-item">
                  <a href="#" target="_blank" className="social-link"></a>
                </li>
                <li className="social-item">
                  <a href="#" target="_blank" className="social-link"></a>
                </li>
                <li className="social-item">
                  <a href="#" target="_blank" className="social-link"></a>
                </li>
                <li className="social-item">
                  <a href="#" target="_blank" className="social-link"></a>
                </li>
                <li className="social-item">
                  <a href="#" target="_blank" className="social-link"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
