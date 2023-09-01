import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInfoDoctor(id);
      if (res && res.data) {
        this.setState({
          detailDoctor: res.data,
        });
      }
      // console.log(res);
    }
  }

  render() {
    // console.log(this.props.match.params.id);
    let language = this.props.language;
    let { detailDoctor } = this.state;

    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-doctor-container container">
          <div className="introduction-doctor">
            <span
              className="avatar-doctor"
              style={{
                backgroundImage: `url(${detailDoctor.image})`,
              }}
            ></span>
            <div className="info-doctor">
              <h3 className="main-title">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </h3>
              <p className="desc">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description}
              </p>
            </div>
          </div>
          <div className="schedule-doctor container">
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <DoctorSchedule
                  doctorId={
                    detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                  }
                />
              </div>
              <div class="col-md-5 col-sm-12">
                <div class="bg-secondary"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-doctor container-fluid">
          <div className="container detail-doctor-content">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                />
              )}
          </div>
        </div>
        <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);