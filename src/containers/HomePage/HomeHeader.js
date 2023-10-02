import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBasic: false,
    };
  }

  toggleNavbar = () => {
    this.setState((prevState) => ({
      showBasic: !prevState.showBasic,
    }));
  };

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
    const { showBasic } = this.state;
    const language = this.props.language;
    return (
      <React.Fragment>
        <header>
          <MDBNavbar expand="lg" light bgColor="white">
            <MDBContainer fluid>
              <MDBNavbarToggler
                onClick={this.toggleNavbar}
                aria-controls="navbarExample01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <MDBIcon fas icon="bars" />
              </MDBNavbarToggler>
              <MDBCollapse show={showBasic}>
                <MDBNavbarNav right className="mb-2 mb-lg-0">
                  <MDBNavbarItem active>
                    <MDBNavbarLink aria-current="page" href="#">
                      Home
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="#">Features</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="#">Pricing</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="#">About</MDBNavbarLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>

          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">Heading</h1>
            <h4 className="mb-3">Subheading</h4>
            <a className="btn btn-primary" href="" role="button">
              Call to action
            </a>
          </div>
        </header>
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
