import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import "../scss/ReactionOfUser.scss";
class ReactionOfUser extends Component {
  componentDidMount() {
    // Initialize Owl Carousel using jQuery
    $("#testimonial-slider").owlCarousel({
      items: 2,
      itemsDesktop: [1000, 2],
      itemsDesktopSmall: [980, 1],
      itemsTablet: [768, 1],
      pagination: true,
      navigation: true,
      navigationText: ["<", ">"],
      autoPlay: true,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="testimonial-slider" className="owl-carousel">
              {/* Testimonial items */}
              {this.props.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial-item equal-height style-6"
                >
                  <div className="testimonial-image cell-left">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="cell-right">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-job">{testimonial.job}</div>
                  </div>
                  <div className="testimonial-content quote">
                    <i className="fa fa-quote-left"></i>
                    {testimonial.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionOfUser);
