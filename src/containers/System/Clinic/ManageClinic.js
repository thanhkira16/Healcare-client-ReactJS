import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { createClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",

      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
    };
  }

  async componentDidMount() {}

  handleOnChangeInput = (event, field) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
      console.log("Image URL: " + objectUrl);
    }
  };

  handleSave = () => {
    const { address, name, imageBase64, descriptionHTML, descriptionMarkdown } =
      this.state;

    // Check if any required fields are empty
    if (!name || !imageBase64 || !descriptionHTML || !descriptionMarkdown) {
      toast.error(
        <FormattedMessage id="manage-clinic.missingParameterError" />
      );
      return;
    }

    // Call the API service to create a new clinic
    createClinic({
      name,
      address,
      imageBase64,
      descriptionHTML,
      descriptionMarkdown,
    })
      .then((newClinic) => {
        if (newClinic.errCode === 0) {
          toast.success(
            <FormattedMessage id="manage-clinic.createClinicSuccess" />
          );
        } else {
          toast.error(
            <FormattedMessage id="manage-clinic.createClinicFailed" />
          );
        }
        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewImgURL: "",
          address: "",
        });
      })
      .catch((error) => {
        toast.error(<FormattedMessage id="manage-clinic.unknownError" />);
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <>
        <div className="app-container">
          <div className="container">
            <div className="row mb-3">
              {/* Input for clinic Name */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="clinicName">
                    <FormattedMessage id="manage-clinic.clinicName" />
                  </label>
                  <input
                    type="text"
                    id="clinicName"
                    className="form-control input-area"
                    value={this.state.name}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "name")
                    }
                  />
                </div>
              </div>

              {/* Input for clinic Image */}
              <div className="col-md-6">
                <label htmlFor="inputImage" className="d-block">
                  <FormattedMessage id="manage-clinic.clinicImage" />
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
                    <i className="fas fa-upload"></i>
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

            <div className="row">
              <div className="col-md-6 mb-5">
                <div className="form-group">
                  <label htmlFor="clinicName">
                    <FormattedMessage id="manage-clinic.clinicAddress" />
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control input-area"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <MdEditor
                  style={{ height: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
                />
              </div>
            </div>

            {/* Save button */}
            <div className="row mt-3">
              <div className="col-md-12">
                <button
                  className="btn btn-primary px-5"
                  onClick={this.handleSave}
                >
                  <FormattedMessage id="manage-clinic.btnSave" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: "100px" }}></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
