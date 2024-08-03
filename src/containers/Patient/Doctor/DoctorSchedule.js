import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./DoctorSchedule.scss";
import moment from "moment";
import "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTimes: [],
      isOpenModalBooking: false,

      dataBookingModalFromSchedule: [],
    };
  }
  async componentDidMount() {
    let language = this.props.language;
    this.getArrDays(language);
    let allDays = this.getArrDays(language);
    this.setState({
      allDays,
    });

    if (this.props.doctorId) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorId,
        allDays[0].value
      );
      this.setState({
        allAvailableTimes: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays,
      });
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorId,
        allDays[0].value
      );
      this.setState({
        allAvailableTimes: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      // let dateLabel = this.initDateLabel(event.target.key, this.props.language);
      // console.log("date label", dateLabel);
      let dateLabel = event.target.options[event.target.selectedIndex].label;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTimes: res.data ? res.data : [],
          dateSelected: dateLabel,
        });
      }
      // console.log("available schedules", res.data);
    }
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleOpenModalBooking = (item, timeDisplay) => {
    this.setState({
      isOpenModalBooking: true,
      dataBookingModalFromSchedule: item,
    });
  };
  initDateLabel = (i, language) => {
    let label;
    if (i === 0) {
      let today = language === LANGUAGES.VI ? "Hôm nay" : "Today";
      label = today + " " + moment().format("DD/MM");
    } else {
      if (language === LANGUAGES.VI) {
        let lebelVi = moment().add(i, "days").format("dddd - DD/MM");
        label = this.capitalizeFirstLetter(lebelVi);
      } else {
        label = moment().add(i, "days").locale("en").format("ddd - DD/MM");
      }
    }
    return label;
  };
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      let label = this.initDateLabel(i, language);
      object.label = label;
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      object.index = i;
      allDays.push(object);
    }
    return allDays;
  };

  handleCloseBookingModal = () => {
    this.setState({ isOpenModalBooking: false });
  };
  render() {
    let {
      allDays,
      allAvailableTimes,
      isOpenModalBooking,
      dataBookingModalFromSchedule,
    } = this.state;
    let language = this.props.language;
    // console.log("schedule state", typeof this.state.timeSelected);

    return (
      <>
        <div className="doctor-schedule ">
          <div className="all-schedule">
            <select
              onChange={(event) => this.handleOnChangeSelect(event)}
              className="select-schedule"
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((day, index) => {
                  // console.log(day.label, "day", index);
                  return (
                    <option key={index} value={day.value} label={day.label}>
                      {day.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="title-calendar">
              <span className="title-calendar-icon fas fa-calendar-alt"></span>
              <span>
                <FormattedMessage id="patient.detail-doctor.appointment" />
              </span>
            </div>
            <div className="time-available">
              {allAvailableTimes && allAvailableTimes.length > 0 ? (
                allAvailableTimes.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;

                  return (
                    <button
                      key={index}
                      className={`btn-time ${
                        language === "en" ? "btn-en" : ""
                      }`}
                      onClick={() =>
                        this.handleOpenModalBooking(item, timeDisplay)
                      }
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <FormattedMessage id="patient.detail-doctor.not-available-time" />
              )}
            </div>
          </div>

          {/* {allAvailableTimes && allAvailableTimes.length > 0 && (
            <span className="pick-title">
              <FormattedMessage id="patient.detail-doctor.pick-time-tittle-first-part" />{" "}
              <i class="fas fa-hand-point-up"></i>
              <FormattedMessage id="patient.detail-doctor.pick-time-tittle-second-part" />
            </span>
          )}
          {this.props.isShowSeparator && this.props.isShowSeparator === true ? (
            <div className="seperator"></div>
          ) : (
            ""
          )} */}
        </div>
        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          dataBookingModal={dataBookingModalFromSchedule}
          onCloseBookingModal={this.handleCloseBookingModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
