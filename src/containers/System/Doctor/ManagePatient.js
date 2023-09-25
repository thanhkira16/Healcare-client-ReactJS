import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { getAllPaitentsBookedAppoiment } from "../../../services/userService";
import moment from "moment";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerOpen: false,
      currDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      textDate: "",
      dataPatients: [],
    };
  }

  async componentDidMount() {
    let { user } = this.props;

    let { currDate } = this.state;
    let formatedDate = new Date(currDate).getTime();
    this.getDataPatients(user, formatedDate);
  }

  getDataPatients = async (user, formatedDate) => {
    let res = await getAllPaitentsBookedAppoiment({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatients: res.data,
      });
    }
  };

  componentDidUpdate(prevProps) {}
  handleDatePickerClick = () => {
    this.setState((prevState) => ({
      isDatePickerOpen: !prevState.isDatePickerOpen,
    }));
  };

  handleOnChangeDatePicker = (date) => {
    let formattedDate, currDate;
    currDate = moment(date).add(0, "days").startOf("day").valueOf();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long", // Include the full name of the day of the week
    };

    if (this.props.language === LANGUAGES.VI) {
      // For Vietnamese language, format as "Thứ N, dd/mm/yyyy"
      formattedDate = date.toLocaleDateString("vi-VN", options);
    } else {
      // For English language, format as "Monday, mm/dd/yyyy"
      formattedDate = date.toLocaleDateString("en-US", options);
    }

    this.setState(
      {
        currDate,
        textDate: formattedDate,
      },
      () => {
        let { user } = this.props;
        let { currDate } = this.state;
        let formatedDate = new Date(currDate).getTime();
        this.getDataPatients(user, formatedDate);
      }
    );
  };

  render() {
    console.log(" user ", this.state);
    let { dataPatients } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="container">
          <div className="title">Quan ly benh nhan</div>
          <div className="row mb-4">
            <div className="input-area col-md-4">
              <label>
                <FormattedMessage id="manage-schedules.pick-date" />
              </label>
              <div className="date-picker" onClick={this.handleDatePickerClick}>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control date-picker-select"
                  selected={this.state.currDate}
                  minDate={new Date(new Date().getTime() - 24 * 60 * 60 * 1000)}
                  // minDate={new Date()}
                  style={{ fontSize: "18px" }}
                  // format={dateFormat.SEND_TO_SERVER}
                  isOpen={this.state.isDatePickerOpen}
                />
                <input
                  type="text"
                  className="date-picker-text"
                  value={this.state.textDate}
                  readOnly // Make the input read-only to display the selected date
                  placeholder="Select a date"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <table id="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Time</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Address</th>
                  <th scope="col">Gender</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {dataPatients &&
                  dataPatients.length > 0 &&
                  dataPatients.map((item, index) => {
                    let time =
                      language === LANGUAGES.VI
                        ? item.timeTypeDataPatient.valueVi
                        : item.timeTypeDataPatient.valueEn;
                    let gender =
                      language === LANGUAGES.VI
                        ? item.patientData.genderData.valueVi
                        : item.patientData.genderData.valueEn;
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>
                        <td>
                          {/* Add action buttons or links here for each user */}
                          {/* For example, a button to view user details */}

                          <button
                            className="btn red px-3"
                            // onClick={() => this.handleEditUser(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-primary px-3"
                            // onClick={() => this.handleDeleteUser(user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
