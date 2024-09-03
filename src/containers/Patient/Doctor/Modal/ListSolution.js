import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ListSolution.scss";

class ListSolution extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div className="list-solution-container">
        <h2 className="section-heading">
          <FormattedMessage id="listSolution.heading" defaultMessage="What Will You Learn In Our SEO Focused Training Course" />
        </h2>
        <ul className="list-group">
          <li className="list-group-item">
            <span>1</span>
            <div>
              <h5>
                <FormattedMessage id="listSolution.item1.heading" defaultMessage="Optimizing your site for mobile devices" />
              </h5>
              <p>
                <FormattedMessage id="listSolution.item1.description" defaultMessage="One of the keys of great SEO is having a mobile-friendly website which works smoothly on all devices." />
              </p>
            </div>
          </li>
          <li className="list-group-item">
            <span>2</span>
            <div>
              <h5>
                <FormattedMessage id="listSolution.item2.heading" defaultMessage="Understand how users search" />
              </h5>
              <p>
                <FormattedMessage id="listSolution.item2.description" defaultMessage="It's not enough anymore to find relevant industry keywords and write huge amounts of content." />
              </p>
            </div>
          </li>
          <li className="list-group-item">
            <span>3</span>
            <div>
              <h5>
                <FormattedMessage id="listSolution.item3.heading" defaultMessage="Write for humans optimize for engines" />
              </h5>
              <p>
                <FormattedMessage id="listSolution.item3.description" defaultMessage="Write well-structured and understandable articles, not just a mix of paragraphs that contain keywords." />
              </p>
            </div>
          </li>
          <li className="list-group-item">
            <span>4</span>
            <div>
              <h5>
                <FormattedMessage id="listSolution.item4.heading" defaultMessage="Analyze your existing search traffic" />
              </h5>
              <p>
                <FormattedMessage id="listSolution.item4.description" defaultMessage="A good action plan comes out of understanding where your current position is and the environment." />
              </p>
            </div>
          </li>
          <li className="list-group-item">
            <span>5</span>
            <div>
              <h5>
                <FormattedMessage id="listSolution.item5.heading" defaultMessage="Keep updated with the latest changes" />
              </h5>
              <p>
                <FormattedMessage id="listSolution.item5.description" defaultMessage="Google changes its search indexing algorithm twice a year, so it's important to stay updated with news." />
              </p>
            </div>
          </li>
          <li className="list-group-item">
            <span>6</span>
            <div>
              <h5>
                <FormattedMessage id="listSolution.item6.heading" defaultMessage="Learn the most important ranking factors" />
              </h5>
              <p>
                <FormattedMessage id="listSolution.item6.description" defaultMessage="Learn which are the most important search engine ranking factors and optimize your website accordingly." />
              </p>
            </div>
          </li>
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSolution);
