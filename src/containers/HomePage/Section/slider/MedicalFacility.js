import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllClinics } from "../../../../services/userService";
import { withRouter } from "react-router";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
      slides: [],
    };
  }
  async componentDidMount() {
    try {
      const res = await getAllClinics();

      if (res.errCode === 0) {
        console.log("clinic res data", res.data);
        this.setState({ dataClinic: res.data ? res.data : [] });
        console.log(this.state);
      } else {
        console.error("Failed to get all clinic");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  handleViewDetailClinic(clinicId) {
    this.props.history.push(`/detail-clinic/${clinicId}`);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.assignDataOfCarousel();
    }
    if (prevState.dataClinic !== this.state.dataClinic) {
      this.assignDataOfCarousel();
    }
  }

  assignDataOfCarousel() {
    let { dataClinic } = this.state;
    let { language } = this.props;
    let slides = [];

    if (dataClinic && dataClinic.length > 0) {
      dataClinic.forEach((item, index) => {
        // let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
        // let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;

        // Create a new slide object for each iteration
        let slide = {
          img: item.image,
          // mainTitle: language === LANGUAGES.VI ? nameVi : nameEn,
          mainTitle: item.name,
          clinicId: item.id,
        };

        slides.push(slide);
      });
      this.setState({
        slides: slides,
      });
    }
  }
  render() {
    console.log("props", this.state);
    let { slides } = this.state;
    return (
      <>
        <div className="container-fluid medical-container">
          <div className="container">
            <div className="medical-header">
              <span className="header-title">
                <FormattedMessage id="home-page.medical-popularity" />
              </span>
              <span className="home-btn-see-more">
                <FormattedMessage
                  id="home-page.btnSeeMore"
                  defaultMessage="See more"
                />
              </span>
            </div>
            <Slider {...this.props.settings}>
              {slides.map((slide, index) => {
                return (
                  <div className="card-container">
                    <div
                      className="card p-2 py-3 text-center"
                      onClick={() =>
                        this.handleViewDetailClinic(slide.clinicId)
                      }
                      key={index}
                    >
                      <div
                        className=" mb-2 avt-medical"
                        style={{
                          backgroundImage: `url(${slide.img})`,
                        }}
                      ></div>
                      <h5 className="mb-0 main-title">{slide.mainTitle}</h5>

                      {/* <div className="ratings mt-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div> */}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </>
      // <div className="section-common ">
      //   <div className="section-header">
      //     <span className="title-section">

      //     </span>
      //     <button className="btn-section">
      //       <FormattedMessage
      //         id="home-page.btnSeeMore"
      //         defaultMessage="See more"
      //       />
      //     </button>
      //   </div>

      //   <div className="section-body">
      //     <Slider {...this.props.settings}>
      //       {dataClinic.map((item, index) => {
      //         return (
      //           <div className="section-custiomize">
      //             <div
      //               className="slider-card card-specialty"
      //               key={index}
      //               onClick={() => this.handleViewDetailSpecialty(item)}
      //             >
      //               <div className="section-specialty" key={index}>
      //                 <span
      //                   className="bg-img specialty-image"
      //                   style={{ backgroundImage: `url(${item.image})` }}
      //                 ></span>
      //                 <span className="specialty-name">{item.name}</span>
      //               </div>
      //             </div>
      //           </div>
      //         );
      //       })}
      //     </Slider>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
