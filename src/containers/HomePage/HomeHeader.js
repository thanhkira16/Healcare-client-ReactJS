import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,

    };
  }
  handleMenuOpen = () => {
    this.setState({ isOverlayActive: true });
  };

  handleMenuClose = () => {
    this.setState({ isOverlayActive: false });
  };


  switchLanguage() {
    const currLanguage = this.props.language;

    console.log(LANGUAGES.VI, " ", LANGUAGES.EN);
    const oppositeLanguage =
      currLanguage === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;

    // const hideLanguageBtn =
    //   document.getElementsByClassName("hide-language-btn")[0];
    // console.log(hideLanguageBtn);

    // if (oppositeLanguage === LANGUAGES.VI) {
    //   hideLanguageBtn.style.left = "0px";
    //   console.log(hideLanguageBtn.style.left);
    // } else {
    //   hideLanguageBtn.style.left = "32px";
    //   console.log(hideLanguageBtn.style.left);
    // }
    this.props.changeLanguageAppRedux(oppositeLanguage);
  }

  returnToHomePage = () => {
    this.props.history.push("/home");
  };

  render() {
    const { isOverlayActive } = this.state;
    const language = this.props.language;
    const oppositeLanguage =
      language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;
    return (
      <React.Fragment>
        <header>
          <a className="header-logo" href="/">
            
          </a>
          <nav>
            <ul className="nav__links">
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </nav>
          <a className="cta" href="#" onClick={() => this.switchLanguage()}>
            {oppositeLanguage.toUpperCase()}
          </a>
          <p class="menu cta">Menu</p>
          <div
            className={`overlay ${isOverlayActive ? "overlay--active" : ""}`}
          >
            <a className="close" onClick={this.handleMenuClose}>
              &times;
            </a>
            <div className="overlay__content">
              <a href="#">Services</a>
              <a href="#">Projects</a>
              <a href="#">About</a>
            </div>
          </div>
        </header>

        {this.props.isShowBanner == true && (
          <div className="banner row d-flex flex-wrap flex-lg-nowrap flex-md-wrap">
            <div className="banner-left   mt-md-5 mb-lg-5 text-md-start text-center col-md-5 col-12 col-sm-12  col-lg-6">
              <div className="banner-title">
                <h3 className="main-title">
                  <FormattedMessage id="banner.main-title" />
                </h3>
                <h2 className="sub-title">
                  <FormattedMessage id="banner.sub-title" />
                </h2>
                <p className="desc">
                  <FormattedMessage id="banner.desc" />
                </p>
                <span className="btn-appoiment">
                  <FormattedMessage id="banner.btn-make-appoiment" />
                </span>
              </div>
            </div>
            <div className="banner-right  col-12 col-md-5 col-sm-12  col-lg-6 text-center mx-auto mx-sm-0">
              <div className="banner-right-background"></div>
            </div>
            {/* <div className="banner-container">
              <div className=" container-full-width">
                
              </div>
            </div> */}
            {/* <div className="search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder={
                  <FormattedMessage id="banner.search-placeholder" />
                }
              />
            </div> */}

            {/* <ul className="row options-banner-list">
              <li className="col-2 option-banner-item">
                <a href="#" className="option-banner-link">
                  <i className="fas fa-hospital"></i>
                  <br />
                  <span className="option-banner-text">
                    <FormattedMessage id="banner.option1" />
                  </span>
                </a>
              </li>
              <li className="col-2 option-banner-item">
                <a href="#" className="option-banner-link">
                  <i className="fas fa-mobile"></i>
                  <br />

                  <span className="option-banner-text">
                    <FormattedMessage id="banner.option2" />
                  </span>
                </a>
              </li>
              <li className="col-2 option-banner-item">
                <a href="#" className="option-banner-link">
                  <i className="fas fa-window-restore"></i>
                  <br />
                  <span className="option-banner-text">
                    <FormattedMessage id="banner.option3" />
                  </span>
                </a>
              </li>
              <li className="col-2 option-banner-item">
                <a href="#" className="option-banner-link">
                  <i className="fas fa-syringe"></i>
                  <br />
                  <span className="option-banner-text">
                    <FormattedMessage id="banner.option4" />
                  </span>
                </a>
              </li>
              <li className="col-2 option-banner-item">
                <a href="#" className="option-banner-link">
                  <i className="fas fa-user-md"></i>
                  <br />
                  <span className="option-banner-text">
                    <FormattedMessage id="banner.option5" />
                  </span>
                </a>
              </li>
              <li className="col-2 option-banner-item">
                <a href="#" className="option-banner-link">
                  <i className="fas fa-stethoscope"></i>
                  <br />
                  <span className="option-banner-text">
                    <FormattedMessage id="banner.option6" />
                  </span>
                </a>
              </li>
            </ul> */}
          </div>
        )}
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
