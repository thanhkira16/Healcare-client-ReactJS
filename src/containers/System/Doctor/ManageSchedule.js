import React, { Component } from "react";
import { connect } from "react-redux";
// import Header from "../containers/Header/Header";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
// import DatePicker from "../../../components/Input/DatePicker";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      listDoctors: "",
      currDate: "",
      rangeTime: [],
    };
  }

  buildDataSelectDoctor = (inputData) => {
    let results = [];
    let language = this.props.language;
    // console.log(language);
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        results.push(object);
      });
    }

    return results;
  };

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate", prevProps.allDoctors);
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataSelectDoctor(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataSelectDoctor(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: this.props.allScheduleTime,
      });
    }
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    let rangeTimeSelected = [];
    if (rangeTime && rangeTime.length > 0) {
      rangeTimeSelected = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      // console.log("selected", rangeTimeSelected);
      this.setState({ rangeTime: rangeTimeSelected });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currDate } = this.state;
    let result = [];
    // console.log("curr range time: ", rangeTime);
    if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error(<FormattedMessage id="manage-schedules.invalidDoctor" />);
      return;
    }
    if (!currDate) {
      toast.error(<FormattedMessage id="manage-schedules.invalidDate" />);
      return;
    }
    // console.log("currDate: " + currDate);
    // let formatedDate = moment(currDate).unix();
    let formatedDate = new Date(currDate).getTime();
    // console.log("format date", formatedDate);

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);

      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        console.log("invalid selected time");
        return;
      }
    }
    // console.log("selectedTime", result);
    // console.log("check result", result);
    let res = await saveBulkScheduleDoctor({
      arraySchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });
    if (res.errCode === 0) {
      toast.success(
        <FormattedMessage id="manage-schedules.saveChangesSuccess" />
      );
    } else {
      toast.error(<FormattedMessage id="manage-schedules.saveChangesFailed" />);
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currDate: date,
    });
  };

  render() {
    const { selectedDoctor, listDoctors } = this.state;
    // console.log(listDoctors);
    let { language } = this.props;
    // console.log(this.state);
    let rangeTime = this.state.rangeTime;
    // console.log("range time", rangeTime);
    return (
      <>
        <div className="container manage-schedule-doctor">
          <span className="title d-block">
            <FormattedMessage id="manage-schedules.title" />
          </span>
          <div className="select-container row mb-3 mt-3">
            <div className="col-md-6 ">
              <label>
                <FormattedMessage id="manage-schedules.pick-doctor" />
              </label>
              <div className="input-area">
                <Select
                  value={selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={listDoctors}
                />
              </div>
            </div>
            <div className="input-area col-md-6">
              <label>
                <FormattedMessage id="manage-schedules.pick-date" />
              </label>
              <div className="date-picker">
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control  "
                  selected={this.state.currDate}
                  minDate={new Date(new Date().getTime() - 24 * 60 * 60 * 1000)}
                  // minDate={new Date()}
                  style={{ fontSize: "18px" }}
                  format={dateFormat.SEND_TO_SERVER}
                />
              </div>
            </div>
          </div>
          <div className=" pick-time-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, index) => {
                // console.log("item", item);
                return (
                  <button
                    className={
                      item.isSelected === true
                        ? "btn btn-custom active px-5 border mx-2 mt-2  d-block"
                        : "btn btn-custom px-5 border mx-2 mt-2  d-block"
                    }
                    key={index}
                    onClick={() => this.handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                  </button>
                );
              })}
          </div>
          <button
            className="btn btn-primary px-5 mt-3 d-block"
            onClick={this.handleSaveSchedule}
          >
            <FormattedMessage id="manage-schedules.btnSave" />
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
