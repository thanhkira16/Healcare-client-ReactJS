import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import "../../../styles/Base.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES } from "../../../utils";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { text } from "@fortawesome/fontawesome-svg-core";
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
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      listDoctors: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
  }

  buildDataSelectDoctor = (inputData) => {
    let results = [];
    let language = this.props.language;

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
  componentDidUpdate(prevProps) {
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
  }

  handleEditorChange = ({ html, text }) => {
    console.log(html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleOnChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSavecontentMarkdown = () => {
    console.log("savecontentMarkdown", this.state);
    this.props.doSaveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    });
  };

  render() {
    const { selectedOption, listDoctors } = this.state;
    return (
      <>
        <div className="app grid">
          <div className="title mb-3">
            {" "}
            <FormattedMessage id="manage-doctor.title" />
          </div>
          <div className="short-input">
            <div className="select">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.doctorLabel" />
              </label>
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={listDoctors}
              />
            </div>
            <div className="form">
              <label className="form-label" for="textAreaExample">
                <FormattedMessage id="manage-doctor.description" />
              </label>
              <textarea
                className="form-control"
                id="textAreaExample1"
                rows="4"
                onChange={(event) => this.handleOnChangeDesc(event)}
              ></textarea>
            </div>
          </div>

          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    doSaveDetailDoctorRedux: (data) =>
      dispatch(actions.doSaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
