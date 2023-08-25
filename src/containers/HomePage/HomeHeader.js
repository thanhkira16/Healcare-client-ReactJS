import React, { Component } from "react";
import { connect } from "react-redux";
import "./Base.scss";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
  switchLanguage() {
    const currLanguage = this.props.language;
    console.log("curr", currLanguage);
    console.log(LANGUAGES.VI, " ", LANGUAGES.EN);
    const oppositeLanguage =
      currLanguage === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;

    const hideLanguageBtn =
      document.getElementsByClassName("hide-language-btn")[0];
    console.log(hideLanguageBtn);
    console.log("op", oppositeLanguage);
    if (oppositeLanguage === LANGUAGES.VI) {
      hideLanguageBtn.style.left = "32px"; // Move to the left
      console.log(hideLanguageBtn.style.left);
    } else {
      hideLanguageBtn.style.left = "0px"; // Move to the right
      console.log(hideLanguageBtn.style.left);
    }
    this.props.changeLanguageAppRedux(oppositeLanguage);
  }

  render() {
    const language = this.props.language;
    return (
      <React.Fragment>
        <div className="header">
          <div className="grid">
            <div className="header-navbar row">
              <div className="col-2 nav-left">
                <i className="fas fa-bars header-open-slidebar"></i>
                <a href="" className="header-logo"></a>
              </div>
              <div className="col-8 nav-center">
                <ul className="row nav-center-list">
                  <li className="col-2 nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.speciality" />
                      </b>
                    </p>
                    <p className="sub-title">
                      <FormattedMessage id="homeheader.searchdoctor" />
                    </p>
                  </li>
                  <li className="col-2 nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.health-facility" />
                      </b>
                    </p>
                    <p className="sub-title">
                      <FormattedMessage id="homeheader.select-room" />
                    </p>
                  </li>
                  <li className="col-2 nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.doctor" />
                      </b>
                    </p>
                    <p className="sub-title">
                      <FormattedMessage id="homeheader.select-doctor" />
                    </p>
                  </li>
                  <li className="col-2 nav-center-item">
                    <p className="main-title">
                      <b>
                        <FormattedMessage id="homeheader.fee" />
                      </b>
                    </p>
                    <p className="sub-title">
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

        <div className="banner">
          <div className="banner-container">
            <div className=" grid-full-width">
              <div className="title">
                <h3>
                  <FormattedMessage id="banner.main-title" />
                </h3>
                <h2>
                  <FormattedMessage id="banner.sub-title" />
                </h2>
              </div>
            </div>
          </div>
          <div className="search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder={<FormattedMessage id="banner.search-placeholder" />}
            />
          </div>

          <ul className="row options-banner-list">
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
          </ul>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
