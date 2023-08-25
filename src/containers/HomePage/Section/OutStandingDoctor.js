import React, { Component } from "react";
import { connect } from "react-redux";
// import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }
  render() {
    let language = this.props.language;
    console.log(language);
    let arrDoctors = this.state.arrDoctors;
    arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log(arrDoctors);
    return (
      <div className="section-common section-outstanding-doctor">
        <div className="common-header">
          <span className="title-section">
            <FormattedMessage id="home-page.out-standings-doctor" />
          </span>
          <button className="btn-section">
            <FormattedMessage id="home-page.btnSeeMore" />
          </button>
        </div>

        <div className="common-body">
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
                  <div className="common-custiomize">
                    <div className="card-doctor">
                      <div
                        className="bg-img section-outstanding-doctor"
                        style={{ backgroundImage: `url(${imgBase64})` }}
                      ></div>
                      <div className="doctor-details">
                        <span className="doctor-name">
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
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
