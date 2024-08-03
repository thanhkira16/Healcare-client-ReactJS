import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { getAllSpecialties } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import SearchCarousel from "./Section/slider/SearchCarousel";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            fullname: "",
            phone: "",
            department: "",
            description: "",
        };
    }

    async componentDidMount() {
        try {
            const res = await getAllSpecialties();
            if (res.errCode === 0) {
                console.log("check data", res.data);
                this.setState({ dataSpecialty: res.data ? res.data : [] });
                console.log(this.state);
            } else {
                console.error("Failed to get all specialty");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted with state:", this.state);
        // You can add further logic to send this data to a server or perform other actions
    };

    switchLanguage = () => {
        const currLanguage = this.props.language;
        const oppositeLanguage =
            currLanguage === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;
        this.props.changeLanguageAppRedux(oppositeLanguage);
    };

    handleMenuOpen = () => {
        this.setState({ isOverlayActive: true });
    };

    handleMenuClose = () => {
        this.setState({ isOverlayActive: false });
    };

    handleClickBtnShop = () => {
        window.open("http://localhost:3000/", "_blank");
    };

    returnToHomePage = () => {
        this.props.history.push("/home");
    };

    render() {
        const { isOverlayActive, dataSpecialty, fullname, phone, department, description } = this.state;
        const { language, isShowBanner } = this.props;

        return (
            <React.Fragment>
                <div className="header">
                    <div className="container">
                        <div className="header-navbar row">
                            <div className="col-2 nav-left">
                                {/* <i className="fas fa-bars header-open-slidebar"></i> */}
                                <a href="" className="header-logo d-none d-md-block" onClick={this.returnToHomePage}></a>
                            </div>
                            <div className="col-8 nav-center">
                                {/* Nav Center Items */}
                            </div>
                            <div className="col-2 nav-right">
                                <div className="shop" onClick={this.handleClickBtnShop}>
                                    <i className="fas fa-shopping-bag"></i>
                                    <FormattedMessage id="homeheader.shop" />
                                </div>
                                <div className="dropdown-language" onClick={this.switchLanguage}>
                                    <span className="hide-language-btn"></span>
                                    <span className={`language-btn${language !== LANGUAGES.VI ? " language-vi offline" : " language-vi"}`}>
                                        <i className="fas fa-star"></i>
                                    </span>
                                    <span className={`language-btn${language !== LANGUAGES.EN ? " language-en offline" : " language-en"}`}>
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isShowBanner && (
                    <div>
                        <div className="banner row d-flex flex-wrap flex-lg-nowrap flex-md-wrap">
                            <div className="banner-left mt-md-5 mb-lg-5 text-md-start text-center col-md-5 col-12 col-sm-12 col-lg-6">
                                <div className="register">
                                    <strong className="register-title">
                                        <FormattedMessage id="homeheader.register" />
                                    </strong>
                                    <form onSubmit={this.handleSubmit}>
                                        <input
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={fullname}
                                            onChange={this.handleChange}
                                            placeholder="Fullname"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            pattern="[0-9]{10,11}"
                                            value={phone}
                                            onChange={this.handleChange}
                                            placeholder="Phone number"
                                            required
                                        />
                                        <select
                                            id="department"
                                            name="department"
                                            value={department}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            <option value="">Select specialty</option>
                                            {dataSpecialty.map(specialty => (
                                                <option key={specialty.id} value={specialty.name}>
                                                    {specialty.name}
                                                </option>
                                            ))}
                                        </select>
                                        <textarea
                                            placeholder="Description..."
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <input type="submit" value={language === "en" ? "Submit" : "Gửi đăng ký"} />
                                    </form>
                                </div>
                            </div>
                            <div className="banner-right col-12 col-md-5 col-sm-12 col-lg-6 text-center mx-auto mx-sm-0">
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
                        <SearchCarousel />
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
