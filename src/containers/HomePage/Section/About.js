import React, { Component } from "react";
import { connect } from "react-redux";
import YouTube from "react-youtube";
class About extends Component {
  changeLanguage(language) {
    this.props.changeLanguageAppRedux(language);
  }
  render() {
    return (
      <React.Fragment>
        <div className="about">
          <div className="grid">
            <h4 className="about-title">Truyền thông nói về BookingCare</h4>
            <div className="row">
              <div className="video col-6">
                <YouTube videoId="FyDQljKtWnI" />
              </div>
              <ul className="social-list col-6">
                <li className="social-item">
                  <a
                    href="https://www.youtube.com/watch?v=mstAc81lpMc"
                    target="_blank"
                    className="social-link"
                  ></a>
                </li>

                <li className="social-item">
                  <a
                    href="https://vietnamnet.vn/thong-tin-truyen-thong"
                    target="_blank"
                    className="social-link"
                  ></a>
                </li>
                <li className="social-item">
                  <a
                    href="https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html"
                    target="_blank"
                    className="social-link"
                  ></a>
                </li>
                <li className="social-item">
                  <a
                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm"
                    target="_blank"
                    className="social-link"
                  ></a>
                </li>
                <li className="social-item">
                  <a
                    href="https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
                    target="_blank"
                    className="social-link"
                  ></a>
                </li>
                <li className="social-item">
                  <a
                    href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
                    target="_blank"
                    className="social-link"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
