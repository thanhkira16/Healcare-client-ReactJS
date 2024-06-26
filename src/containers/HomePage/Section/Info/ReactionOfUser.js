import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import "../scss/ReactionOfUser.scss";
class ReactionOfUser extends Component {
  render() {
    return (
      <div className="container">
        <div className="slider">
        <div className="slide-track">
          {[...Array(14)].map((_, index) => (
            <div className="slide" key={index}>
              <img
                src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/${
                  (index % 7) + 1
                }.png`}
                height="100"
                width="250"
                alt=""
              />
            </div>
          ))}
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
