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
      fullname: "",
      phone: "",
      department: "",
      description: "",
    };
  }
  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with state:", this.state);
    // You can add further logic to send this data to a server or perform other actions
  };
  switchLanguage() {
    const currLanguage = this.props.language;
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
    return (
      <React.Fragment>
        <div className="header">
          <div className="container">
            <div className="header-navbar row">
              <div className="col-2 nav-left">
                {/* <i className="fas fa-bars header-open-slidebar"></i> */}
                <a
                  href=""
                  className="header-logo d-none d-md-block"
                  onClick={this.returnToHomePage}
                ></a>
              </div>
              <div className="col-8 nav-center">
                {/* <ul className="row nav-center-list">
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
                </ul> */}
              </div>
              <div className="col-2 nav-right">
                <div className="shop">
                  <i class="fas fa-shopping-bag"></i>
                  <FormattedMessage id="homeheader.shop" />
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
                    // onClick={  () => this.changeLanguage(LANGUAGES.EN)}
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
              <div className="register">
                <h2>
                  {" "}
                  <FormattedMessage id="homeheader.register" />
                </h2>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={this.state.fullname}
                    onChange={this.handleChange}
                    placeholder="Fullname"
                    required
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10,11}"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    placeholder="Phone number"
                    required
                  />
                  <select
                    id="department"
                    name="department"
                    value={this.state.department}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Select speciality</option>
                    <option value="Nội khoa">Nội khoa</option>
                    <option value="Ngoại khoa">Ngoại khoa</option>
                    <option value="Răng hàm mặt">Răng hàm mặt</option>
                    <option value="Tim mạch">Tim mạch</option>
                    {/* Add other specialties as needed */}
                  </select>

                  <textarea
                    placeholder="Description..."
                    id="description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                  ></textarea>

                  <input
                    type="submit"
                    value={language == "en" ? "Submit" : "Gửi đăng ký"}
                  />
                </form>
              </div>
            </div>
            <div className="banner-right  col-12 col-md-5 col-sm-12  col-lg-6 text-center mx-auto mx-sm-0">
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
              </div>
              <div className="banner-right-background"></div>
            </div>
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
