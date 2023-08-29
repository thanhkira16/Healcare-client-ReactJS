import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { USER_ROLE } from "../../utils/constant";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: "vi",
      menuApp: [],
    };
  }

  handleLanguageClick = (language) => {
    this.props.changeLanguageAppRedux(language);
    this.setState({ activeLanguage: language });
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({ menuApp: menu });
  }

  render() {
    const { processLogout, userInfo } = this.props;
    const { activeLanguage } = this.state;
    // console.log("user info", userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
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
