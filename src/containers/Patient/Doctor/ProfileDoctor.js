import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./ProfileDoctor.scss";
import moment from "moment";
import "moment/locale/vi";
import { getProfileDoctorByID } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({ dataProfile: data });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorByID(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }
  convertToCustomFormat(number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(3).replace(".", ",");
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  renderPrice(dataProfile, language) {
    if (
      dataProfile &&
      dataProfile.Doctor_Infor &&
      dataProfile.Doctor_Infor.priceTypeData
    ) {
      const priceValue =
        language === LANGUAGES.VI
          ? dataProfile.Doctor_Infor.priceTypeData.valueVI
          : language === LANGUAGES.EN
          ? dataProfile.Doctor_Infor.priceTypeData.valueEN
          : null; // Handle other languages if needed

      if (priceValue !== null) {
        return (
          this.convertToCustomFormat(priceValue) +
          (language === LANGUAGES.VI ? " VND" : " $")
        );
      }
    }
    return "";
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderTimeBooking = (dataTime) => {
    let language = this.props.language;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("dddd - MM/DD/YYYY");
      let forMatedDate = this.capitalizeFirstLetter(date);
      return (
        <>
          <span>
            {time + "  -  "}
            {forMatedDate}
          </span>
        </>
      );
    }
  };

  render() {
    // console.log("check prop", this.props.dataBookingModal);
    let { dataProfile } = this.state;
    console.log("render", this.props.doctorId);
    let { language, dataBookingModal, isShowDescription } = this.props;

    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <>
        <div className="profile-doctor-container">
          <div className="introduction-doctor">
            <div
              className="avatar-doctor"
              style={{
                backgroundImage: `url(${dataProfile.image})`,
              }}
            >
              <Link
                className="link-to-detail-doctor"
                to={`/detail-doctor/${this.props.doctorId}`}
              ></Link>
            </div>

            <ul className="info-doctor">
              <li className="profile-title">
                <FormattedMessage id="patient.booking-modal.booking-title" />
              </li>
              <li className="infor-doctor-contain-name-and-time">
                <span className="slider-card-title">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </span>
                <>{this.renderTimeBooking(dataBookingModal)}</>
              </li>
              {isShowDescription == true ? (
                <li className="doctor-desc">
                  {dataProfile &&
                  dataProfile.Markdown &&
                  dataProfile.Markdown.description
                    ? dataProfile.Markdown.description
                    : ""}
                </li>
              ) : (
                ""
              )}
              <li className="price">
                <span>
                  <FormattedMessage id="patient.booking-modal.price-title" />
                </span>
                {this.renderPrice(dataProfile, this.props.language)}
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
