import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: "vi",
    };
  }

  handleLanguageClick = (language) => {
    this.props.changeLanguageAppRedux(language);
    this.setState({ activeLanguage: language });
  };

  render() {
    const { processLogout, userInfo } = this.props;
    const { activeLanguage } = this.state;
    console.log("check user info", userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />
            {userInfo && userInfo.firstName && userInfo.lastName
              ? userInfo.firstName + " " + userInfo.lastName
              : ""}
          </span>
          <span
            className={`language-vi ${activeLanguage === "vi" ? "active" : ""}`}
            onClick={() => this.handleLanguageClick("vi")}
          >
            VN
          </span>
          <span
            className={`language-en ${activeLanguage === "en" ? "active" : ""}`}
            onClick={() => this.handleLanguageClick("en")}
          >
            EN
          </span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
