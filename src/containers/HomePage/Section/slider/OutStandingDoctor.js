import React, { Component } from "react";
import { connect } from "react-redux";
// import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { withRouter } from "react-router";
import DoctorCard from "../card/DoctorCard";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      slides: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
    if (prevState.arrDoctors !== this.state.arrDoctors) {
      this.assignDataOfCarousel(this.state.arrDoctors);
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }
  assignDataOfCarousel(arrDoctors) {
    console.log("object", arrDoctors);
    let language = this.props;
    let slides = [];

    if (arrDoctors && arrDoctors.length > 0) {
      arrDoctors.forEach((item, index) => {
        let imgBase64 = "";
        if (item.image) {
          imgBase64 = Buffer.from(item.image, "base64").toString("binary");
        }

        let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
        let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;

        // Create a new slide object for each iteration
        let slide = {
          img: imgBase64,
          mainTitle: language === LANGUAGES.VI ? nameVi : nameEn,
          doctorId: item.id,
        };

        slides.push(slide);
      });
      this.setState({
        slides: slides,
      });
    }
  }

  render() {
    let language = this.props.language;
    console.log("dumaaaa", this.state);
    let { slides } = this.state;
    return (
      <>
        <div className="container" style={this.props.backgroundColor}>
          <h2> Responsive Product Carousel</h2>
          <Slider {...this.props.settings}>
            {slides.map((slide, index) => {
              return (
                <div key={index}>
                  <DoctorCard slide={slide} />
                  {/* <img src={slide.img} alt={`slide${index}`} /> */}
                </div>
              );
            })}
          </Slider>
        </div>
        {/* <div className="section-common section-outstanding-doctor">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-page.out-standings-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="home-page.btnSeeMore" />
            </button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imgBase64 = "";
                  if (item.image) {
                    imgBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                  return (
                    <div
                      className="section-custiomize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="slider-card">
                        <div
                          className="bg-img section-outstanding-doctor"
                          style={{ backgroundImage: `url(${imgBase64})` }}
                        ></div>
                        <div className="slider-card-detail">
                          <span className="slider-card-title">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </span>
                          <span className="doctor-title">
                            Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành
                            Paris{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
