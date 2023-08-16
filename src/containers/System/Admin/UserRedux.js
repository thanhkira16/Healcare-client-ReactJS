import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArray: [],
      positionArray: [],
      roleArray: [],
      previewImgURL: "",
      isOpenPreviewImg: false,
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
      this.setState({ genderArray: this.props.genderRedux });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({ positionArray: this.props.positionRedux });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({ roleArray: this.props.roleRedux });
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
      });
      console.log("Image url: " + objectUrl);
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpenPreviewImg: true,
    });
  };

  render() {
    let genders = this.state.genderArray;
    let position = this.state.positionArray;
    let role = this.state.roleArray;
    let language = this.props.language;
    let isLoadingData =
      this.props.isLoadingGender &&
      this.props.isLoadingPosition &&
      this.props.isLoadingRole;
    console.log("loading", isLoadingData);
    console.log("check state", this.state);
    return (
      <div className="container">
        <div className="title">
          <FormattedMessage id="manage-user.addingTitle" />
        </div>
        <span>{isLoadingData === true ? "Loading..." : ""}</span>
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
                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
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
              {position &&
                position.length > 0 &&
                position.map((item, index) => {
                  return (
                    <option key={index}>
                      {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRoleID">
              <FormattedMessage id="manage-user.role" />
            </label>
            <select id="inputRoleID" className="form-control form-control-lg">
              {role &&
                role.length > 0 &&
                role.map((item, index) => {
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
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary px-5 d-flex justify-content-center align-items-center"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
