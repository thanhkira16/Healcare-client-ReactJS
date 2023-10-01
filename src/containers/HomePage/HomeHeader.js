import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  componentDidMount() {}
  switchLanguage() {
    const currLanguage = this.props.language;

    console.log(LANGUAGES.VI, " ", LANGUAGES.EN);
    const oppositeLanguage =
      currLanguage === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;

    const hideLanguageBtn =
      document.getElementsByClassName("hide-language-btn")[0];
    console.log(hideLanguageBtn);

    if (oppositeLanguage === LANGUAGES.VI) {
      hideLanguageBtn.style.left = "0px"; // Move to the left
      console.log(hideLanguageBtn.style.left);
    } else {
      hideLanguageBtn.style.left = "32px"; // Move to the right
      console.log(hideLanguageBtn.style.left);
    }
    this.props.changeLanguageAppRedux(oppositeLanguage);
  }

  returnToHomePage = () => {
    this.props.history.push("/home");
  };

  render() {
    const language = this.props.language;
    return (
      <React.Fragment>
        <div className="header">
          <div className="container">
            <div className="header-navbar row">
              <div className="col-2 nav-left">
                <i className="fas fa-bars header-open-slidebar"></i>
                <a
                  href=""
                  className="header-logo d-none d-md-block"
                  onClick={this.returnToHomePage}
                ></a>
              </div>
              <div className="col-8 nav-center">
                <ul className="row nav-center-list">
                  <li className="col-md-3 d-none d-md-block nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.speciality" />
                      </b>
                    </p>
                    <p className="sub-title d-none d-sm-block ">
                      <FormattedMessage id="homeheader.searchdoctor" />
                    </p>
                  </li>
                  <li className="col-md-3 d-none d-md-block nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.health-facility" />
                      </b>
                    </p>
                    <p className="sub-title d-none d-sm-block ">
                      <FormattedMessage id="homeheader.select-room" />
                    </p>
                  </li>
                  <li className="col-md-3 d-none d-md-block nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.doctor" />
                      </b>
                    </p>
                    <p className="sub-title d-none d-sm-block ">
                      <FormattedMessage id="homeheader.select-doctor" />
                    </p>
                  </li>
                  <li className="col-md-3 d-none d-md-block nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.fee" />
                      </b>
                    </p>
                    <p className="sub-title d-none d-sm-block ">
                      <FormattedMessage id="homeheader.check-health" />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-2 nav-right">
                <div className="support">
                  <i className="fas fa-question-circle"></i>
                  <FormattedMessage id="homeheader.support" />
                </div>
                <div
                  className="dropdown-language "
                  onClick={() => this.switchLanguage()}
                >
                  <span className="hide-language-btn"></span>
                  <span
                    className={`language-btn${
                      language !== LANGUAGES.VI
                        ? " language-vi offline"
                        : " language-vi"
                    }`}
                    // onClick={() => this.changeLanguage(LANGUAGES.VI)}
                  >
                    <i className="fas fa-star"></i>
                  </span>
                  <span
                    className={`language-btn${
                      language !== LANGUAGES.EN
                        ? " language-en offline"
                        : " language-en"
                    }`}
                    // onClick={() => this.changeLanguage(LANGUAGES.EN)}
                  >
                    <i className="fas fa-plus"></i>
                  </span>
                </div>
                {/* <div className="switch-language">
                  <button
                    id="language-button"
                    className="button"
                    value="en"
                    onClick={() => this.switchLanguage()}
                  >
                    EN
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

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
