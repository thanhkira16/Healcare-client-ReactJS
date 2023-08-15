import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArray: [],
    };
  }

  async componentDidMount() {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        this.setState({ genderArray: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let genders = this.state.genderArray;
    let language = this.props.language;
    console.log(genders);
    return (
      <div className="container">
        <div className="title">Adding user with Thanh Kira</div>
        <div className="row mb-3 mt-3">
          <div className="col-md-6 ">
            <label htmlFor="inputEmail">
              <FormattedMessage id="manage-user.email" />
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="inputEmail"
              placeholder={<FormattedMessage id="manage-user.email" />}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword">
              <FormattedMessage id="manage-user.password" />
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="inputPassword"
              placeholder={<FormattedMessage id="manage-user.password" />}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputFirstName">
              <FormattedMessage id="manage-user.firstname" />
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="inputFirstName"
              placeholder={<FormattedMessage id="manage-user.firstname" />}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastName">
              <FormattedMessage id="manage-user.lastname" />
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="inputLastName"
              placeholder={<FormattedMessage id="manage-user.lastname" />}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputAddress">
              <FormattedMessage id="manage-user.address" />
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="inputAddress"
              placeholder={<FormattedMessage id="manage-user.address" />}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputImage" className="d-block">
              <FormattedMessage id="manage-user.image" />
            </label>
            <input type="file" className="form-control-file" id="inputImage" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputPhoneNumber">
              <FormattedMessage id="manage-user.phonenumber" />
            </label>
            <input
              type="tel"
              className="form-control form-control-lg"
              id="inputPhoneNumber"
              placeholder={<FormattedMessage id="manage-user.phonenumber" />}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputGender">
              <FormattedMessage id="manage-user.gender" />
            </label>
            <select id="inputGender" className="form-control formcontrol-lg">
              {genders &&
                genders.length > 0 &&
                genders.map((item, index) => {
                  return (
                    <option key={index}>
                      {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputPosition">
              <FormattedMessage id="manage-user.position" />
            </label>
            <select id="inputPosition" className="form-control form-control-lg">
              <option>Doctor</option>
              <option>Professor</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRoleID">
              <FormattedMessage id="manage-user.role-id" />
            </label>
            <select id="inputRoleID" className="form-control form-control-lg">
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary px-5 d-flex justify-content-center align-items-center"
            >
              <FormattedMessage id="manage-user.save" />
            </button>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
