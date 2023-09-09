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

  buildDataSelectDoctor = (inputData, type) => {
    let results = [];
    let language = this.props.language;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USER" ? `${item.lastName} ${item.firstName}` : item.valueVI;
        let labelEn =
          type === "USER" ? `${item.firstName} ${item.lastName}` : item.valueEN;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = type === "USER" ? item.id : item.keyMap;

        if (type === "PRICE")
          object["label"] += " " + (language === LANGUAGES.VI ? "VND" : "USD");

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
        let dataSelectPaymemt = this.buildDataSelectDoctor(resPayment);
        let dataSelectProvince = this.buildDataSelectDoctor(resProvince);
        let dataSelectPrice = this.buildDataSelectDoctor(resPrice, "PRICE");
        this.setState({
          listPrice: dataSelectPrice,
          listPayment: dataSelectPaymemt,
          listProvince: dataSelectProvince,
        });
      } else {
        console.log("allRerequiredDoctorInfor is not defined");
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
        let { resPayment, resPrice, resProvince } = allRerequiredDoctorInfor;
        let dataSelectPaymemt = this.buildDataSelectDoctor(resPayment);
        let dataSelectProvince = this.buildDataSelectDoctor(resProvince);
        let dataSelectPrice = this.buildDataSelectDoctor(resPrice, "PRICE");
        this.setState({
          listPrice: dataSelectPrice,
          listPayment: dataSelectPaymemt,
          listProvince: dataSelectProvince,
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
    let { listPayment, listPrice, listProvince } = this.state;
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let provinceId,
        paymentId,
        priceId,
        nameClinic,
        addressClinic,
        note,
        selectedProvince,
        selectedPayment,
        selectedPrice = "";

      // let provinceId = "";
      // let paymentId = "";
      // let priceId = "";
      // let nameClinic = "";
      // let addressClinic = "";
      // let note = "";
      // let selectedProvince = "";
      // let selectedPayment = "";
      // let selectedPrice = "";

      if (res.data.Doctor_Infor) {
        nameClinic = res.data.Doctor_Infor.nameClinic;
        addressClinic = res.data.Doctor_Infor.addressClinic;
        note = res.data.Doctor_Infor.note;

        provinceId = res.data.Doctor_Infor.provinceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;

        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
      }

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
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSavecontentMarkdown = () => {
    // console.log("savecontentMarkdown", this.state);
    let { hasOldData } = this.state;
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
    });
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
    } = this.state;
    console.log("state", this.state);
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
                onChange={this.handleSelectedDoctorInfor}
                options={listProvince}
                placeholder={
                  <FormattedMessage id="manage-doctor.select-placeholder-province" />
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
          <MdEditor
            style={{ height: "500px" }}
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
