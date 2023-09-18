import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfor.scss";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorByID } from "../../../services/userService";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      extraDoctor: {},
    };
  }
  async componentDidMount(prevProps) {
    if (this.props.doctorId) {
      let res = await getExtraInforDoctorByID(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({ extraDoctor: res.data });
      }
    }
  }
  async componentDidUpdate(prevProps) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getExtraInforDoctorByID(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({ extraDoctor: res.data });
      }
    }
  }

  showHideDetailDoctorInfor = (status) => {
    this.setState({ isShowDetailPrice: status });
  };
  convertToCustomFormat(number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(3).replace(".", ",");
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    let language = this.props.language;
    let { isShowDetailPrice, extraDoctor } = this.state;
    console.log("extra doctor", extraDoctor);
    return (
      <>
        <div className="doctor-extra-info-container ">
          <div className="content-up">
            <span className="text-address">
              {" "}
              <FormattedMessage id="patient.extra-infor-doctor.address-title" />
            </span>
            <span className="name-clinic">
              {extraDoctor && extraDoctor.nameClinic
                ? extraDoctor.nameClinic
                : ""}
            </span>
            <span className="detail-address">
              <i className="detail-address-icon fas fa-map-marker"></i>
              {extraDoctor && extraDoctor.addressClinic
                ? extraDoctor.addressClinic
                : ""}
            </span>
          </div>
          <div className="content-down">
            {isShowDetailPrice == false && (
              <div className="price-content-up">
                <span className="price-title">
                  <FormattedMessage id="patient.extra-infor-doctor.price-title" />
                </span>
                <span className="price-sub-title">
                  {" "}
                  {extraDoctor && extraDoctor.priceTypeData
                    ? language === LANGUAGES.VI
                      ? this.convertToCustomFormat(
                          extraDoctor.priceTypeData.valueVI
                        ) + " VND"
                      : this.convertToCustomFormat(
                          extraDoctor.priceTypeData.valueEN
                        ) + " $"
                    : ""}
                </span>
                <span
                  className="open-close-price-detail-btn"
                  onClick={() => this.showHideDetailDoctorInfor(true)}
                >
                  <FormattedMessage id="patient.extra-infor-doctor.show-price-detail" />
                </span>
              </div>
            )}

            {isShowDetailPrice == true && (
              <div className="price-content-down">
                <span className="price-title">
                  <FormattedMessage id="patient.extra-infor-doctor.price-title" />
                </span>
                <div className="price-detail">
                  <div className="price-detail-title">
                    <span className="left">
                      <FormattedMessage id="patient.extra-infor-doctor.price-title" />
                    </span>
                    <span className="right">
                      {" "}
                      {extraDoctor && extraDoctor.priceTypeData
                        ? language === LANGUAGES.VI
                          ? this.convertToCustomFormat(
                              extraDoctor.priceTypeData.valueVI
                            ) + " VND"
                          : this.convertToCustomFormat(
                              extraDoctor.priceTypeData.valueEN
                            ) + " $"
                        : ""}
                    </span>
                  </div>
                  <div className="price-desc">
                    {extraDoctor && extraDoctor.note ? extraDoctor.note : ""}
                  </div>
                  <div className="payment-method-detail">
                    <FormattedMessage id="patient.extra-infor-doctor.payment-detail" />
                    {extraDoctor && extraDoctor.paymentTypeData
                      ? language === LANGUAGES.VI
                        ? extraDoctor.paymentTypeData.valueVI
                        : extraDoctor.paymentTypeData.valueEN
                      : ""}
                  </div>
                </div>
                <span
                  className="open-close-price-detail-btn"
                  onClick={() => this.showHideDetailDoctorInfor(false)}
                >
                  {" "}
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price-detail" />
                </span>
              </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
