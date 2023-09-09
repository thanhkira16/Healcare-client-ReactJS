import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
      statusVerify: false,
      errCode: -1,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlSearchParams = new URLSearchParams(window.location.search);
      let token = urlSearchParams.get("token");
      let doctorId = urlSearchParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: 0,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      // Handle language change
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // Handle doctorId change
    }
  }

  render() {
    const { errCode, statusVerify } = this.state;

    return (
      <>
        {" "}
        <HomeHeader />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              {statusVerify ? (
                errCode === 0 ? (
                  <div className="alert alert-success">
                    Verification succeeded! Your email has been verified.
                  </div>
                ) : (
                  <div className="alert alert-danger">
                    Verification failed. Please try again later.
                  </div>
                )
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
