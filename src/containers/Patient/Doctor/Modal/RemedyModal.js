import React, { Component } from "react";
import "moment/locale/vi";
import { connect } from "react-redux";
import { CommonUtils } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import _ from "lodash";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (prevProps.dataRemedyModal !== this.props.dataRemedyModal) {
      this.setState({
        email: this.props.dataRemedyModal.email,
      });
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImgURL: objectUrl,
        imgBase64: base64,
      });
      console.log("Image url: " + objectUrl);
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { language, dataRemedyModal } = this.props;
    let { email } = this.state;
    console.log("preparing state", this.props);
    return (
      <>
        <Modal
          isOpen={this.props.isOpenModalBooking}
          centered
          className="modal"
          size="lg"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Gửi hóa đơn khám bệnh</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={this.props.onCloseRemedyModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control input-email"
                    placeholder="Enter email"
                    defaultValue={email}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "email")
                    }
                  />
                </div>
              </div>
              <div className="col col-md-6">
                <div className="form-group">
                  <label>File</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.onCloseRemedyModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSendRemedy}
            >
              Send
            </button>
          </div>
        </Modal>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
