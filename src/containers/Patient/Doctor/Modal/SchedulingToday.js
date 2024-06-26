import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./SchedulingToday.scss";
class SchedulingToday extends Component {
  state = {
    emojis: [
      ["🐳", "John Doe", "9:00 AM"],
      ["🐋", "Jane Smith", "10:30 AM"],
      ["🐬", "Michael Brown", "11:15 AM"],
      ["🐟", "Emily Johnson", "1:00 PM"],
      ["🐠", "David Wilson", "2:30 PM"],
      ["🐡", "Sarah Martinez", "3:45 PM"],
      ["🦈", "Daniel Davis", "4:30 PM"],
      ["🐙", "Lisa Miller", "5:15 PM"],
      ["🐚", "Kevin Garcia", "6:00 PM"],
    ],
  };

  render() {
    const { emojis } = this.state;

    return (
      <div className="wrapper">
        <div className="carousel">
          {emojis.map((emoji, index) => (
            <div className="carousel__item" key={index}>
              <div className="carousel__item-head">{emoji[0]}</div>
              <div className="carousel__item-body">
                <p className="title">{emoji[1]}</p>
                <p>Scheduled: {emoji[2]}</p>
              </div>
            </div>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(SchedulingToday);
