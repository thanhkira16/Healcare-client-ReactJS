import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { Button, Modal, ModalFooter, Input } from "reactstrap";
import { postPatientBookAppointment } from "../../../../services/userService";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      forWhom: "",
      selectedGender: "",
      birthday: "",
      doctorId: "",
      timeType: "",
      genders: "",

      errors: {},
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
  }
  // Define a function to validate the input values
  validateInput = () => {
    const errors = {};

    // Validate Full Name
    if (!this.state.fullname.trim()) {
      errors.fullname = "Full Name is required";
    }

    // Validate Phone Number
    if (!this.state.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/g.test(this.state.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be a 10-digit number";
    }

    // Validate Email
    if (!this.state.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(this.state.email)) {
      errors.email = "Invalid email format";
    }

    // Validate Gender
    if (!this.state.selectedGender) {
      errors.selectedGender = "Gender is required";
    }

    // Validate Address
    if (!this.state.address.trim()) {
      errors.address = "Address is required";
    }

    // Validate Reason
    if (!this.state.reason.trim()) {
      errors.reason = "Reason is required";
    }

    // Return the validation errors (if any)
    return errors;
  };

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataBookingModal !== prevProps.dataBookingModal) {
      let data = this.props.dataBookingModal;
      let timeType = this.props.dataBookingModal.timeType;
      let doctorId = data && !_.isEmpty(data) ? data.doctorId : "";
      this.setState({
        doctorId: doctorId,
        timeType: timeType,
      });
    }
  }
  handleCloseModal = () => {
    this.props.onCloseBookingModal();
  };

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  handleConfirmBooking = async () => {
    const err = this.validateInput();
    this.setState({ errors: err });
    if (_.isEmpty(err)) {
      let date = new Date(this.state.birthday).getTime();
      let res = await postPatientBookAppointment({
        fullname: this.state.fullname,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        reason: this.state.reason,
        // forWhom:this.state.fullname,
        selectedGender: this.state.selectedGender.value,
        date: date,
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
      });
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success(
          <FormattedMessage id="patient.booking-modal.booking-success" />
        );
      } else {
        toast.error(
          <FormattedMessage id="patient.booking-modal.booking-failded" />
        );
      }
    } else {
      console.log("Booking", this.state);
    }
  };

  handleOnChangeDatePicker = (date) => {
    console.log(date);
    this.setState({
      birthday: date,
    });
  };
  render() {
    let { language, dataBookingModal } = this.props;
    let doctorId =
      dataBookingModal && !_.isEmpty(dataBookingModal)
        ? dataBookingModal.doctorId
        : "";
    console.log("state", this.state);
    return (
      <>
        <div>
          <Modal
            isOpen={this.props.isOpenModalBooking}
            centered
            className="modal"
            size="lg"
            style={{ maxWidth: "800px", width: "100%" }}
          >
            <div className="modal-body">
              <ProfileDoctor
                doctorId={doctorId}
                dataBookingModal={dataBookingModal}
                // timeSelected={this.props.timeSelected}
                // dateSelected={this.props.dateSelected}
              />
              <div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <label for="fullname">
                        <FormattedMessage id="patient.booking-modal.fullname" />
                      </label>
                      <Input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={this.state.fullname}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "fullname")
                        }
                        placeholder={
                          <FormattedMessage id="patient.booking-modal.fullname" />
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <label for="phoneNumber">
                        <FormattedMessage id="patient.booking-modal.phonenumber" />
                      </label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "phoneNumber")
                        }
                        placeholder={
                          <FormattedMessage id="patient.booking-modal.phonenumber-placeholder" />
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <label for="email">
                        <FormattedMessage id="patient.booking-modal.email" />
                      </label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "email")
                        }
                        placeholder={
                          <FormattedMessage id="patient.booking-modal.email-placeholder" />
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <label for="gender">
                        <FormattedMessage id="patient.booking-modal.gender" />
                      </label>
                      <Select
                        name="gender"
                        id="gender"
                        value={this.state.selectedGender}
                        onChange={this.handleOnChangeSelect}
                        options={this.state.genders}
                        placeholder={
                          <FormattedMessage id="patient.booking-modal.gender-placeholder" />
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <label for="address">
                        <FormattedMessage id="patient.booking-modal.address" />
                      </label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        value={this.state.address}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "address")
                        }
                        placeholder={
                          <FormattedMessage id="patient.booking-modal.address-placeholder" />
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label for="address">
                        <FormattedMessage id="patient.booking-modal.birthday" />
                      </label>
                      <DatePicker
                        onChange={this.handleOnChangeDatePicker}
                        className="form-control  "
                        selected={this.state.birthday}
                        minDate={
                          new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                        }
                        // minDate={new Date()}
                        style={{ fontSize: "18px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label for="reason">
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <Input
                    type="textarea"
                    name="reason"
                    id="reason"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "reason")
                    }
                  />
                </div>
                {/* <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label for="forWhom">Đặt cho ai</label>
                      <Input
                        type="text"
                        name="forWhom"
                        id="forWhom"
                        value={this.state.forWhom}
                        onChange={(event) => this.handleOnchangeInput(event, 'forWhom')}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <div className="option-container">
                        <div className="option">
                          <input
                            type="radio"
                            id="option1"
                            name="options"
                            // value="option1"
                            // checked={selectedOption === "option1"}
                            // onChange={handleOptionChange}
                          />
                          <label htmlFor="option1">Cho mình</label>
                        </div>
                        <div className="option">
                          <input
                            type="radio"
                            id="option2"
                            name="options"
                            // value="option2"
                            // checked={selectedOption === "option2"}
                            // onChange={handleOptionChange}
                          />
                          <label htmlFor="option2">Cho người khác</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <ModalFooter>
                <div>
                  {/* Map over errors and display them */}
                  {Object.keys(this.state.errors).map((key, index) => (
                    <span
                      key={index}
                      className="error-message"
                      style={{ color: "red", display: "block" }}
                    >
                      {this.state.errors[key]}
                    </span>
                  ))}
                </div>
                <Button
                  color="primary"
                  className="px-5"
                  onClick={() => this.handleConfirmBooking()}
                >
                  <FormattedMessage id="patient.booking-modal.btn-confirm" />
                </Button>{" "}
                <Button
                  color="secondary"
                  className="px-5"
                  onClick={this.handleCloseModal}
                >
                  <FormattedMessage id="patient.booking-modal.btn-cancel" />
                </Button>
              </ModalFooter>
            </div>
          </Modal>
        </div>
        <div style={{ height: "100px" }}></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
