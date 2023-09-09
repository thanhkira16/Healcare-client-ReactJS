import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialties } from "../../../services/userService";
import Slider from "react-slick";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await getAllSpecialties();
      if (res.errCode === 0) {
        this.setState({ dataSpecialty: res.data ? res.data : [] });
        console.log(this.state);
      } else {
        console.error("Failed to get all specialty");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  render() {
    const { dataSpecialty } = this.state;
    console.log("props", this.props);
    return (
      <div className="section-common ">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage
              id="home-page.speciality-popularity"
              defaultMessage="Specialty"
            />
          </span>
          <button className="btn-section">
            <FormattedMessage
              id="home-page.btnSeeMore"
              defaultMessage="See more"
            />
          </button>
        </div>

        <div className="section-body">
          <Slider {...this.props.settings}>
            {dataSpecialty.map((item, index) => {
              return (
                <div className="section-custiomize">
                  <div
                    className="slider-card card-specialty"
                    key={index}
                    // onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div className="section-specialty" key={index}>
                      <span
                        className="bg-img specialty-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></span>
                      <span className="specialty-name">{item.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
