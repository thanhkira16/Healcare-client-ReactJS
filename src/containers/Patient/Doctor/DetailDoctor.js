import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./DetailDoctor.scss";
import "../../../styles/Base.scss";
import { FormattedMessage } from "react-intl";
import DoctorSchedule from "./DoctorSchedule";
import SchedulingToday from "./Modal/SchedulingToday";
import DoctorExtraInfor from "./DoctorExtraInfor";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Footer from "../../HomePage/Section/Info/Footer"
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
      console.log("detail doctor", res);
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
              <div className="like-and-share-btn">
                <LikeAndShare></LikeAndShare>
              </div>
            </div>
          </div>
          <div className="schedule-doctor container">
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <DoctorSchedule
                  doctorId={
                    detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                  }
                  isShowSeparator={true}
                />
              </div>
              <div class="col-md-5 col-sm-12">
                <DoctorExtraInfor
                  doctorId={
                    detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detail-doctor container-fluid">
          <div className="container ">
            <div className="row detail-doctor-content">
              <div className="col-lg-6 col-md-6 col-12 detail-doctor-content-left">
                {" "}
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
              <div className="col-lg-6 col-md-6 col-12 detail-doctor-content-right">
                <SchedulingToday />
                <div className="register">
                  <strong className="register-title">
                    {" "}
                    <FormattedMessage id="homeheader.register" />
                  </strong>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={this.state.fullname}
                      onChange={this.handleChange}
                      placeholder="Fullname"
                      required
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      pattern="[0-9]{10,11}"
                      value={this.state.phone}
                      onChange={this.handleChange}
                      placeholder="Phone number"
                      required
                    />

                    <textarea
                      placeholder="Description..."
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      required
                    ></textarea>

                    <input
                      type="submit"
                      value={language == "en" ? "Submit" : "Gửi đăng ký"}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer/>

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
