import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "../../../styles/Base.scss";
import { LANGUAGES } from "../../../utils";
import { getDetailClinicById } from "../../../services/userService";
import Footer from "../../HomePage/Section/Info/Footer.js";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      arrLocations: [],
      dataDetailClinic: {},
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
      let res = await getDetailClinicById({
        id,
      });
      console.log("object", res);
      if (res && res.errCode === 0) {
        let listDoctors = res.listDoctors;
        let arrDoctorId = [];
        if (listDoctors && listDoctors.length > 0) {
          listDoctors.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
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
      //get details doctor
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id,
      });
      console.log("on change select", res);
      if (res && res.errCode === 0) {
        let listDoctors = res.listDoctors;
        let arrDoctorId = [];
        if (listDoctors && listDoctors.length > 0) {
          listDoctors.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { arrDoctorId, dataDetailClinic, arrLocations } = this.state;
    let { language } = this.props;
    const { expanded } = this.state;
    let specialityImage = "";
    console.log("details: ", this.state);
    if (dataDetailClinic.image) {
      specialityImage = Buffer.from(dataDetailClinic.image, "base64").toString(
        "binary"
      );
    }
    // console.log("image", dataDetailClinic.data.image);
    // Check if dataDetailClinic and descriptionHTML exist
    const contentToShow =
      dataDetailClinic && dataDetailClinic.descriptionHTML
        ? expanded
          ? dataDetailClinic.descriptionHTML
          : dataDetailClinic.descriptionHTML.slice(
              0,
              Math.floor(dataDetailClinic.descriptionHTML.length * 0.4)
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
              {dataDetailClinic &&
                dataDetailClinic.descriptionMarkdown &&
                dataDetailClinic.descriptionHTML && (
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
