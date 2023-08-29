import React, { Component } from "react";
import { connect } from "react-redux";
// import Header from "../containers/Header/Header";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import "../../../styles/Base.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      listDoctors: "",
      currDate: "",
      rangeTime: "",
    };
  }

  buildDataSelectDoctor = (inputData) => {
    let results = [];
    let language = this.props.language;
    console.log(language);
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

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if ((item.id = time.id)) {
          item.isSelected = !item.isSelected;
        }
      });
    }
    this.setState({ rangeTime });
  };
  render() {
    const { selectedDoctor, listDoctors } = this.state;
    let { language } = this.props;
    let rangeTime = this.state.rangeTime;
    console.log(rangeTime);
    return (
      <>
        <div className="grid manage-schedule-doctor">
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
                  className="form-control  pb-4"
                  selected={this.state.currDate[0]}
                  minDate={new Date()}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
          </div>
          <div className="row pick-time-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, index) => {
                return (
                  <button
                    className="btn btn--size-s"
                    key={index}
                    onClick={() => this.handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                  </button>
                );
              })}
          </div>
          <button className="btn btn--primary">Save</button>
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
