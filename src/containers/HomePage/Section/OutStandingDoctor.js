import React, { Component } from "react";
import { connect } from "react-redux";
// import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-common section-outstanding-doctor">
        <div className="common-header">
          <span className="title-section">common</span>
          <button className="btn-section">See more</button>
        </div>

        <div className="common-body">
          <Slider {...this.props.settings}>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="common-custiomize">
              <div className="card-doctor">
                <div className="bg-img section-outstanding-doctor"></div>
                <div className="doctor-details">
                  <span className="doctor-name">
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên 1
                  </span>
                  <span className="doctor-title">
                    Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris{" "}
                  </span>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
