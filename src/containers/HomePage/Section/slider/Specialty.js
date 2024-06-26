import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialties } from "../../../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../../utils";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      slides: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await getAllSpecialties();
      if (res.errCode === 0) {
        console.log("check data", res.data);
        this.setState({ dataSpecialty: res.data ? res.data : [] });
        console.log(this.state);
      } else {
        console.error("Failed to get all specialty");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.assignDataOfCarousel();
    }
    if (prevState.dataSpecialty !== this.state.dataSpecialty) {
      this.assignDataOfCarousel();
    }
  }
  handleViewDetailSpecialty(specialtyId) {
    this.props.history.push(`/detail-specialty/${specialtyId}`);
  }
  assignDataOfCarousel() {
    let { dataSpecialty } = this.state;
    console.log("assignDataOfCarousel", dataSpecialty);
    let { language } = this.props;
    let slides = [];

    if (dataSpecialty && dataSpecialty.length > 0) {
      dataSpecialty.forEach((item, index) => {
        // let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
        // let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;

        // Create a new slide object for each iteration
        let slide = {
          img: item.image,
          // mainTitle: language === LANGUAGES.VI ? nameVi : nameEn,
          mainTitle: item.name,
          specialtyId: item.id,
        };

        slides.push(slide);
      });
      this.setState({
        slides: slides,
      });
    }
  }
  render() {
    console.log("props spacialty", this.state);
    let { slides } = this.state;
    return (
      <>
        <div className="container-fluid specialty-container">
          <div className="container">
            <div className="specialty-header">
              <span className="header-title header-title-underline">
                <FormattedMessage
                  id="home-page.speciality-popularity"
                  defaultMessage="Specialty"
                />
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
                        this.handleViewDetailSpecialty(slide.specialtyId)
                      }
                      key={index}
                    >
                      <div
                        className=" mb-2 avt-specialty"
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

      //     </button>
      //   </div>

      //   <div className="section-body">
      //     <Slider {...this.props.settings}>
      //       {dataSpecialty.map((item, index) => {
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
