import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArray: [],
      positionArray: [],
      roleArray: [],
      previewImgURL: "",
      isOpenPreviewImg: false,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      image: "",
      phonenumber: "",
      gender: "",
      position: "",
      role: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({ genderArray: res.data });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArray: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArray: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArray: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        image: "",
        phonenumber: "",
        gender: "",
        position: "",
        role: "",
        previewImgURL: "",
      });
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: file,
      });
      console.log("Image url: " + objectUrl);
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    console.log("Copy state: " + copyState);
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check input state: ", this.state);
      }
    );
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpenPreviewImg: true,
    });
  };

  validateForm = () => {
    const { email, password, firstname, lastname, phonenumber, address } =
      this.state;

    // Define your validation rules here (you can customize them as needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;
    const phoneRegex = /^[0-9]+$/;

    // Check if all required fields are filled
    if (
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !phonenumber ||
      !address
    ) {
      alert("Missing required fields");
      return false;
    }

    // Check if email is valid
    if (!email.match(emailRegex)) {
      alert("Invalid email");
      return false;
    }

    // Check if password meets minimum length
    if (password.length < passwordMinLength) {
      alert("Invalid password");
      return false;
    }

    // Check if phone number contains only numbers
    if (!phonenumber.match(phoneRegex)) {
      alert("Invalid phone number");
      return false;
    }

    // Add more validation rules as needed

    return true;
  };

  handleSaveServer = () => {
    let isValid = this.validateForm();
    if (isValid === false) return;

    this.props.craateNewUser({
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
    });
    this.props.fetchUserRedux();
  };
  render() {
    let genders = this.state.genderArray;
    let positions = this.state.positionArray;
    let roles = this.state.roleArray;
    let language = this.props.language;
    let isLoadingData =
      this.props.isLoadingGender &&
      this.props.isLoadingPosition &&
      this.props.isLoadingRole;
    let { email, password, firstname, lastname, address, phonenumber } =
      this.state;

    return (
      <div className="container">
        <div className="title">
          <FormattedMessage id="manage-user.addingTitle" />
        </div>
        <span>{isLoadingData === true ? "Loading..." : ""}</span>
        <div className="body">
          <div className="row mb-3 mt-3">
            <div className="col-md-6 ">
              <label htmlFor="inputEmail">
                <FormattedMessage id="manage-user.email" />
              </label>
              <div className="input-area">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="inputEmail"
                  placeholder={<FormattedMessage id="manage-user.email" />}
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword">
                <FormattedMessage id="manage-user.password" />
              </label>
              <div className="input-area">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="inputPassword"
                  placeholder={<FormattedMessage id="manage-user.password" />}
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputFirstName">
                <FormattedMessage id="manage-user.firstname" />
              </label>
              <div className="input-area">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="inputFirstName"
                  placeholder={<FormattedMessage id="manage-user.firstname" />}
                  value={firstname}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstname");
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastName">
                <FormattedMessage id="manage-user.lastname" />
              </label>
              <div className="input-area">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="inputLastName"
                  placeholder={<FormattedMessage id="manage-user.lastname" />}
                  value={lastname}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastname");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputAddress">
                <FormattedMessage id="manage-user.address" />
              </label>
              <div className="input-area">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="inputAddress"
                  placeholder={<FormattedMessage id="manage-user.address" />}
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputImage" className="d-block">
                <FormattedMessage id="manage-user.image" />
              </label>
              <div className="previewImg-container">
                <input
                  type="file"
                  className="form-control-file"
                  id="inputImage"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
                <label htmlFor="inputImage">
                  <FormattedMessage id="manage-user.uploadImage" />
                  <i class="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                  onClick={() => this.openPreviewImage()}
                ></div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputPhoneNumber">
                <FormattedMessage id="manage-user.phonenumber" />
              </label>
              <div className="input-area">
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="inputPhoneNumber"
                  placeholder={
                    <FormattedMessage id="manage-user.phonenumber" />
                  }
                  value={phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phonenumber");
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputGender">
                <FormattedMessage id="manage-user.gender" />
              </label>
              <div className="input-area">
                <select
                  id="inputGender"
                  className="form-control formcontrol-lg"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputPosition">
                <FormattedMessage id="manage-user.position" />
              </label>
              <div className="input-area">
                <select
                  id="inputPosition"
                  className="form-control form-control-lg"
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRoleID">
                <FormattedMessage id="manage-user.role" />
              </label>
              <div className="input-area">
                <select
                  id="inputRoleID"
                  className="form-control form-control-lg"
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-primary px-5 d-flex justify-content-center align-items-center"
                onClick={() => {
                  this.handleSaveServer();
                }}
              >
                <FormattedMessage id="manage-user.save" />
              </button>
            </div>
          </div>
          {this.state.isOpenPreviewImg && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpenPreviewImg: false })}
            />
          )}
        </div>
        <div className="table-manage-user">
          <TableManageUser />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.position,
    roleRedux: state.admin.role,
    isLoadingGender: state.admin.isLoadingGender,
    isLoadingPosition: state.admin.isLoadingPosition,
    isLoadingRole: state.admin.isLoadingRole,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    craateNewUser: (data) => dispatch(actions.craateNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
