import React, { Component } from "react";
import { connect } from "react-redux";
class Footer extends Component {
  changeLanguage(language) {
    this.props.changeLanguageAppRedux(language);
  }
  render() {
    return (
      <React.Fragment>
        <div className="copyright container-fluid">
          <div className="container copyright-content">
            <span>
              © 2023 VKU healcare. <br /> Truong Cong Hoang Thanh
            </span>
            <ul className="social-media-list">
              <li className="social-media-item">
                <a href="#" target="_blank" className="social-media-link"></a>
              </li>
              <li className="social-media-item">
                <a href="#" target="_blank" className="social-media-link"></a>
              </li>
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
