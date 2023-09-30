import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import "../../../styles/Base.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { text } from "@fortawesome/fontawesome-svg-core";
import { getDetailInfoDoctor } from "../../../services/userService";
import { toast } from "react-toastify";
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      hasOldData: false,
      // availbleToSave: true,
      action: "",
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      listDoctors: "",

      //save doctor information
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      clinicId: "",
      specialtyId: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getRequiredDoctorInforRedux();
  }

  // buildDataSelectDoctor = (inputData, type) => {
  //   let results = [];
  //   let language = this.props.language;

  //   if (inputData && inputData.length > 0) {
  //     inputData.map((item, index) => {
  //       let object = {};
  //       let labelVi =
  //         type === "USER" ? `${item.lastName} ${item.firstName}` : item.valueVI;
  //       let labelEn =
  //         type === "USER" ? `${item.firstName} ${item.lastName}` : item.valueEN;
  //       object.label = language === LANGUAGES.VI ? labelVi : labelEn;
  //       object.value = type === "USER" ? item.id : item.keyMap;

  //       if (type === "PRICE")
  //         object["label"] += " " + (language === LANGUAGES.VI ? "VND" : "USD");

  //       results.push(object);
  //     });
  //   }

  //   return results;
  // };

  buildDataSelectDoctor = (inputData, type) => {
    let results = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item) => {
        let object = {};
        let labelVi = "";
        let labelEn = "";

        if (type === "USER") {
          labelVi = `${item.lastName} ${item.firstName}`;
          labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
        } else if (type === "PRICE") {
          // console.log("PRICE", item);
          labelVi = `${item.valueVI} VND`;
          labelEn = `${item.valueEN} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
        } else if (type === "PAYMENT") {
          // console.log("PAYMENT", item);
          labelVi = item.valueVI;
          labelEn = item.valueEN;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
        } else if (type === "PROVINCE") {
          labelVi = item.valueVI;
          labelEn = item.valueEN;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
        } else if (type === "SPECIALTY") {
          // labelVi = item.valueVI;
          // labelEn = item.valueEN;
          // object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.label = item.name;
          object.value = item.id;
        } else if (type === "CLINIC") {
          // labelVi = item.valueVI;
          // labelEn = item.valueEN;
          // object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.label = item.name;
          object.value = item.id;
        }

        results.push(object);
      });
    }

    return results;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataSelectDoctor(
        this.props.allDoctors,
        "USER"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      //update another
      let allRerequiredDoctorInfor = this.props.allRerequiredDoctorInfor;
      if (allRerequiredDoctorInfor) {
        let { resPayment, resPrice, resProvince } = allRerequiredDoctorInfor;
        let dataSelectPaymemt = this.buildDataSelectDoctor(
          resPayment,
          "PAYMENT"
        );
        let dataSelectProvince = this.buildDataSelectDoctor(
          resProvince,
          "PROVINCE"
        );
        let dataSelectPrice = this.buildDataSelectDoctor(resPrice, "PRICE");
        this.setState({
          listPrice: dataSelectPrice,
          listPayment: dataSelectPaymemt,
          listProvince: dataSelectProvince,
        });
      }
      //update selected doctor
      let dataSelect = this.buildDataSelectDoctor(
        this.props.allDoctors,
        "USER"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (
      prevProps.allRerequiredDoctorInfor !== this.props.allRerequiredDoctorInfor
    ) {
      let allRerequiredDoctorInfor = this.props.allRerequiredDoctorInfor;
      if (allRerequiredDoctorInfor) {
        let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
          allRerequiredDoctorInfor;

        let dataSelectPaymemt = this.buildDataSelectDoctor(
          resPayment,
          "PAYMENT"
        );
        let dataSelectProvince = this.buildDataSelectDoctor(
          resProvince,
          "PROVINCE"
        );
        let dataSelectPrice = this.buildDataSelectDoctor(resPrice, "PRICE");
        let dataSelectSpecialty = this.buildDataSelectDoctor(
          resSpecialty,
          "SPECIALTY"
        );
        let dataSelectClinic = this.buildDataSelectDoctor(resClinic, "CLINIC");
        this.setState({
          listPrice: dataSelectPrice,
          listPayment: dataSelectPaymemt,
          listProvince: dataSelectProvince,
          listSpecialty: dataSelectSpecialty,
          listClinic: dataSelectClinic,
        });
      } else {
        console.log("allRerequiredDoctorInfor is not defined");
      }
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;

    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let provinceId = "";
      let paymentId = "";
      let priceId = "";
      let nameClinic = "";
      let specialtyId = "";
      let clinicId = "";
      let addressClinic = "";
      let note = "";
      let selectedProvince = ""; // Initialize with null
      let selectedPayment = ""; // Initialize with null
      let selectedPrice = "";
      let selectedSpecialty = "";
      let selectedClinic = "";
      // let provinceId = "";
      // let paymentId = "";
      // let priceId = "";
      // let nameClinic = "";
      // let addressClinic = "";
      // let note = "";
      // let selectedProvince = "";
      // let selectedPayment = "";
      // let selectedPrice = "";
      console.log(res);
      if (res.data.Doctor_Infor) {
        console.log("res", res);
        nameClinic = res.data.Doctor_Infor.nameClinic;
        addressClinic = res.data.Doctor_Infor.addressClinic;
        note = res.data.Doctor_Infor.note;
        console.log(
          "id",
          res.data.Doctor_Infor.provinceId,
          res.data.Doctor_Infor.paymentId
        );

        provinceId = res.data.Doctor_Infor.provinceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;
        console.log("id before", specialtyId, clinicId);

        selectedPayment = listPayment.find((item) => {
          return item && item.value.toString() === paymentId.toString();
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value.toString() === priceId.toString();
        });
        selectedProvince = listProvince.find((item) => {
          console.log("id before", item);
          return item && item.value.toString() === provinceId.toString();
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value.toString() === specialtyId.toString();
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value.toString() === clinicId.toString();
        });
        console.log("object clinic", selectedClinic);
        // selectedClinic = listClinic.find((item) => {
        //   return item && item.value.toString() === clinicId.toString();
        // });

        // console.log(
        //   "findout",
        //   selectedPrice,
        //   selectedProvince,
        //   selectedPayment
        // );
      }
      console.log(listPayment, listProvince, listPrice);
      console.log(selectedPrice, selectedProvince, selectedPayment);
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        nameClinic,
        addressClinic,
        note,
        selectedProvince,
        selectedPayment,
        selectedPrice,
        // availbleToSave: true,
        selectedSpecialty,
        selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        nameClinic: "", // Set other related state properties to empty as needed
        addressClinic: "",
        note: "",
        selectedProvince: "",
        selectedPayment: "",
        selectedPrice: "",
        // availbleToSave: false, // Set other related state properties as needed
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleOnChangeDesc = (event) => {
    document.title = event.target.value;
    this.setState({ description: event.target.value });
  };

  handleSavecontentMarkdown = () => {
    // console.log("savecontentMarkdown", this.state);
    let { hasOldData, availbleToSave } = this.state;
    // if (availbleToSave === true) {
    this.props.doSaveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId:
        this.state.selectedSpecialty && this.state.selectedSpecialty.value
          ? this.state.selectedSpecialty.value
          : "",
    });
    // } else {
    //   toast.error(
    //     // <FormattedMessage id="manage-specialty.missingParameterError" />
    //     "Vui long chon bac sy"
    //   );
    // }
  };

  handleSelectedDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };

    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    const {
      selectedOption,
      listDoctors,
      listPrice,
      listPayment,
      listProvince,
      listSpecialty,
      listClinic,
    } = this.state;
    // console.log("listSpecialty", this.state.listSpecialty);
    return (
      <>
        <div className="app container">
          <div className="title mb-3">
            {" "}
            <FormattedMessage id="manage-doctor.title" />
          </div>
          <div className="doctor-and-description row">
            <div className="select col-12 col-md-4">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.doctorLabel" />
              </label>
              <Select
                value={selectedOption}
                onChange={this.handleChangeSelect}
                options={listDoctors}
                placeholder={
                  <FormattedMessage id="manage-doctor.select-placeholder-doctor" />
                }
              />
            </div>

            <div className="form col-12 col-md-8">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.description" />
              </label>
              <textarea
                className="form-control"
                id="textAreaExample1"
                rows="4"
                value={this.state.description}
                onChange={(event) => this.handleOnChangeDesc(event)}
              ></textarea>
            </div>
          </div>
          <div class="row select-list">
            <div class="col-12 col-md-4 select-item ">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.provinceLabel" />
              </label>
              <Select
                value={this.state.selectedProvince}
                defaultValue={this.state.selectedProvince || "Select"}
                onChange={this.handleSelectedDoctorInfor}
                options={listProvince}
                // placeholder={<FormattedMessage id="manage-doctor.select-placeholder-province" />}

                placeholder={
                  this.state.selectedProvince ? (
                    this.state.selectedProvince.label
                  ) : (
                    <FormattedMessage id="manage-doctor.select-placeholder-province" />
                  )
                }
                name={"selectedProvince"}
              />
            </div>

            <div class="col-12 col-md-4 select-item">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.paymentLabel" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleSelectedDoctorInfor}
                options={listPayment}
                placeholder={
                  <FormattedMessage id="manage-doctor.select-placeholder-payment" />
                }
                name={"selectedPayment"}
              />
            </div>

            <div class="col-12 col-md-4 select-item">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.priceLabel" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleSelectedDoctorInfor}
                options={listPrice}
                placeholder={
                  <FormattedMessage id="manage-doctor.select-placeholder-price" />
                }
                name={"selectedPrice"}
              />
            </div>
          </div>
          <div class="row select-list">
            <div class="col-12 col-md-4 select-item ">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.nameClinic" />
              </label>
              <span className="input-area">
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeText(event, "nameClinic");
                  }}
                  value={this.state.nameClinic}
                />
              </span>
            </div>

            <div class="col-12 col-md-4 select-item">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.addressClinic" />
              </label>
              <span className="input-area">
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeText(event, "addressClinic");
                  }}
                  value={this.state.addressClinic}
                />
              </span>
            </div>

            <div class="col-12 col-md-4 select-item">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.note" />
              </label>
              <span className="input-area">
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeText(event, "note");
                  }}
                  value={this.state.note}
                />
              </span>
            </div>
          </div>
          <div class="row select-list">
            <div class="col-12 col-md-6 select-item ">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.specialty" />
              </label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleSelectedDoctorInfor}
                options={listSpecialty}
                placeholder={
                  <FormattedMessage id="manage-doctor.select-placeholder-specialty" />
                }
                name={"selectedSpecialty"}
              />
            </div>

            <div class="col-12 col-md-6 select-item">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.clinic" />
              </label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleSelectedDoctorInfor}
                options={listClinic}
                placeholder={
                  <FormattedMessage id="manage-doctor.select-placeholder-clinic" />
                }
                name={"selectedClinic"}
              />
            </div>
          </div>

          <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
          <button
            onClick={this.handleSavecontentMarkdown}
            className="btn btn-primary px-5 mt-2"
          >
            <FormattedMessage id="manage-doctor.btnSave" />
          </button>

          <div style={{ height: "200px" }}></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRerequiredDoctorInfor: state.admin.allRerequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInforRedux: () =>
      dispatch(actions.getRequiredDoctorInfor()),
    doSaveDetailDoctorRedux: (data) =>
      dispatch(actions.doSaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
