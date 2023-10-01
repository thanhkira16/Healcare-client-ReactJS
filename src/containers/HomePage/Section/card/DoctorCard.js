// Import React and CSS
import React, { Component } from "react";
import "./DoctorCard.scss"; // Adjust the path based on your project structure
import { withRouter } from "react-router";
import { connect } from "react-redux";
// React Class Component
class DoctorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: {},
    };
  }

  componentDidMount() {
    if (this.props.slide) {
      this.setState({ slide: this.props.slide });
    }
  }
  handleViewDetailDoctor(doctorId) {
    this.props.history.push(`/detail-doctor/${doctorId}`);
  }
  render() {
    const { slide } = this.state;
    console.log("doctor id card", this.props);
    const imgDivStyle = {
      backgroundImage: slide && slide.img ? `url(${slide.img})` : "none",
    };

    return (
      <div
        className="card p-2 py-3 text-center"
        onClick={() => this.handleViewDetailDoctor(slide.doctorId)}
      >
        <div className=" mb-2 avt-doctor" style={imgDivStyle}></div>
        <h5 className="mb-0 main-title">{slide.mainTitle}</h5>
        <small>Neurosurgeon</small>
        <div className="ratings mt-2">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="mt-4 apointment">
          <button className="btn btn-success text-uppercase">
            Book Appointment
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorCard)
);
