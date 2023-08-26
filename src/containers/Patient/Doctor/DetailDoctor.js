import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "../../../styles/Base.scss";
import "./DetailDoctor.scss";
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
      console.log(res);
    }
  }

  render() {
    console.log(this.props.match.params.id);
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
        <div className="detail-doctor-container grid">
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
          <div className="schedule-doctor"></div>
          <div className="detail-doctor">
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
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
