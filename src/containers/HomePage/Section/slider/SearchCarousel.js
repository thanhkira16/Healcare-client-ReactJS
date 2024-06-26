import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../scss/SearchCarousel.scss";
class SearchCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <>
        <div className="container">
          <div className=" search-section  row">
            <ul className="core-skill section col-lg-6 col-md-6 col-12">
              <span className="section-title core-skill-title">
                <strong>Find diseases & conditions by first letter</strong>
              </span>
              <ul className="search-characters">
                <li className="search-item">a</li>
                <li className="search-item">b</li>
                <li className="search-item">c</li>
                <li className="search-item">d</li>
                <li className="search-item">e</li>
                <li className="search-item">f</li>
                <li className="search-item">g</li>
                <li className="search-item">h</li>
                <li className="search-item">i</li>
                <li className="search-item">j</li>
                <li className="search-item">k</li>
                <li className="search-item">l</li>
                <li className="search-item">m</li>
                <li className="search-item">n</li>
                <li className="search-item">o</li>
                <li className="search-item">p</li>
                <li className="search-item">q</li>
                <li className="search-item">r</li>
                <li className="search-item">s</li>
                <li className="search-item">t</li>
                <li className="search-item">u</li>
                <li className="search-item">v</li>
                <li className="search-item">w</li>
                <li className="search-item">x</li>
                <li className="search-item">y</li>
                <li className="search-item">z</li>
              </ul>
            </ul>
            <ul className="other-skill section col-lg-6 col-md-6 col-12">
              <span className="section-title others-skill-title">
                <strong>Search diseases & conditions</strong>
              </span>
              <div id="search" className="search-input">
                <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
                  <rect className="bar" />

                  <g className="magnifier">
                    <circle className="glass" />
                    <line
                      className="handle"
                      x1="32"
                      y1="32"
                      x2="44"
                      y2="44"
                    ></line>
                  </g>

                  <g className="sparks">
                    <circle className="spark" />
                    <circle className="spark" />
                    <circle className="spark" />
                  </g>

                  <g className="burst pattern-one">
                    <circle className="particle circle" />
                    <path className="particle triangle" />
                    <circle className="particle circle" />
                    <path className="particle plus" />
                    <rect className="particle rect" />
                    <path className="particle triangle" />
                  </g>
                  <g className="burst pattern-two">
                    <path className="particle plus" />
                    <circle className="particle circle" />
                    <path className="particle triangle" />
                    <rect className="particle rect" />
                    <circle className="particle circle" />
                    <path className="particle plus" />
                  </g>
                  <g className="burst pattern-three">
                    <circle className="particle circle" />
                    <rect className="particle rect" />
                    <path className="particle plus" />
                    <path className="particle triangle" />
                    <rect className="particle rect" />
                    <path className="particle plus" />
                  </g>
                </svg>
                <input
                  type="search"
                  name="q"
                  aria-label="Search for inspiration"
                />
              </div>
            </ul>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchCarousel);
