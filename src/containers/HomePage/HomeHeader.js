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
  switchLanguage() {
    const currLanguage = this.props.language;

    console.log(LANGUAGES.VI, " ", LANGUAGES.EN);
    const oppositeLanguage =
      currLanguage === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;
    this.props.changeLanguageAppRedux(oppositeLanguage);
  }

  handleMenuOpen = () => {
    this.setState({ isOverlayActive: true });
  };

  handleMenuClose = () => {
    this.setState({ isOverlayActive: false });
  };

  render() {
    const { isOverlayActive } = this.state;
    const language = this.props.language;
    const oppositeLanguage =
      language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;
    return (
      <header>
        <a className="header-logo" href="/"></a>
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

        <div className="button">
          <a className="cta" href="#" onClick={() => this.switchLanguage()}>
            {oppositeLanguage.toUpperCase()}
          </a>
          <a className="cta" href="#">
            Contact
          </a>
        </div>
        <p className="menu cta" onClick={this.handleMenuOpen}>
          Menu
        </p>
        <div className={`overlay ${isOverlayActive ? "overlay--active" : ""}`}>
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
