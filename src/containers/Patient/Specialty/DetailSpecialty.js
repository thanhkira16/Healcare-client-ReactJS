import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "../../../styles/Base.scss";
import { LANGUAGES } from "../../../utils";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import Footer from "../../../containers/HomePage/Section/Info/Footer.js";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      arrLocations: [],
      dataDetailSpecialty: {},
      listDoctors: [],
      expanded: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      //get details doctor
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id,
        location: "ALL",
      });

      if (res && res.errCode === 0) {
        let listDoctors = res.listDoctors;
        let arrDoctorId = [];
        if (listDoctors && listDoctors.length > 0) {
          listDoctors.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }

      //get select location
      let locations = await getAllCodeService("PROVINCE");
      console.log("PROVINCE", locations);
      if (locations && locations.data && locations.data.length > 0) {
        locations.data.unshift({
          keyMap: "ALL",
          type: "PROVINCE",
          valueEN: "Nationally",
          valueVI: "Toàn quốc",
        });
        this.setState({
          arrLocations: locations.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {}
  toggleExpand = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let location = event.target.value;
      //get details doctor
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id,
        location: location,
      });
      console.log("on change select", res, location);
      if (res && res.errCode === 0) {
        let listDoctors = res.listDoctors;
        let arrDoctorId = [];
        if (listDoctors && listDoctors.length > 0) {
          listDoctors.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, arrLocations } = this.state;
    let { language } = this.props;
    const { expanded } = this.state;
    let specialityImage = "";
    console.log("details: ", this.state);
    if (dataDetailSpecialty.image) {
      specialityImage = Buffer.from(
        dataDetailSpecialty.image,
        "base64"
      ).toString("binary");
    }
    // console.log("image", dataDetailSpecialty.data.image);
    // Check if dataDetailSpecialty and descriptionHTML exist
    const contentToShow =
      dataDetailSpecialty && dataDetailSpecialty.descriptionHTML
        ? expanded
          ? dataDetailSpecialty.descriptionHTML
          : dataDetailSpecialty.descriptionHTML.slice(
              0,
              Math.floor(dataDetailSpecialty.descriptionHTML.length * 0.4)
            )
        : "";
    return (
      <>
        <HomeHeader />
        <div className="container-fluid detail-specialty-container">
          <div
            className="detail-specialty-header container-fluid"
            style={{
              backgroundImage: `url(${specialityImage}) `,
            }}
          >
            <div className="detail-specialty-header-content">
              {dataDetailSpecialty &&
                dataDetailSpecialty.descriptionMarkdown &&
                dataDetailSpecialty.descriptionHTML && (
                  <div className="container">
                    <div dangerouslySetInnerHTML={{ __html: contentToShow }} />
                    {!expanded && (
                      <span
                        className="btn-show-hide"
                        onClick={this.toggleExpand}
                      >
                        See More
                      </span>
                    )}
                    {expanded && (
                      <span
                        className="btn-show-hide"
                        onClick={this.toggleExpand}
                      >
                        Hide
                      </span>
                    )}
                  </div>
                )}
            </div>
          </div>
          <div className="select-location container">
            <select
              onChange={(event) => this.handleOnChangeSelect(event)}
              className="select-location-btn"
            >
              {arrLocations &&
                arrLocations.length > 0 &&
                arrLocations.map((item, index) => {
                  // console.log(item.label, "item", index);
                  let labelVi = language === LANGUAGES.VI ? item.valueVI : "";
                  let labelEn = language === LANGUAGES.EN ? item.valueEN : "";

                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? labelVi : labelEn}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="container detail-specialty-body">
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((doctorId) => (
                <div key={doctorId} className="row detail-doctor">
                  <div className="col-md-6 col-sm-12">
                    <ProfileDoctor
                      doctorId={doctorId}
                      isShowDescription={true}
                    />
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <DoctorSchedule doctorId={doctorId ? doctorId : -1} />
                    </div>

                    <div className="row">
                      <DoctorExtraInfor doctorId={doctorId ? doctorId : -1} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
