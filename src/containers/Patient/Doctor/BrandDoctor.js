import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './BrandDoctor.scss';

class BrandDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    componentDidUpdate(prevProps) { }

    render() {
        return (
            <>

                <div className="container text-center py-5">
                    <div className="row">
                        {this.renderService(
                            "fas fa-chart-pie",
                            "Position Analysis",
                            "Understand where your website is currently positioned in search engine queries"
                        )}
                        {this.renderService(
                            "fas fa-key",
                            "Keyword Planning",
                            "Find the best relevant keywords that fit your website SEO strategy in the long run"
                        )}
                        {this.renderService(
                            "fas fa-newspaper",
                            "Writing Articles",
                            "How to plan your content strategy and write articles that are optimized for SEO"
                        )}
                        {this.renderService(
                            "fas fa-link",
                            "Gathering Backlinks",
                            "Backlinks are vital for SEO and we'll teach you everything there is to know about them"
                        )}
                        {this.renderService(
                            "far fa-handshake",
                            "Build Partnerships",
                            "Partnerships will help you establish your website or blog as an authority in your field"
                        )}
                        {this.renderService(
                            "fas fa-chart-bar",
                            "Evaluate Actions",
                            "Learn how to use the right analytics tools to evaluate your SEO actions and improve them"
                        )}
                    </div>
                </div>
            </>
        );
    }

    renderService(iconClass, title, description) {
        return (
            <div className="col-md-4 mb-4">
                <div className="service-box">
                    <div className="icon mb-3">
                        <i className={iconClass}></i>
                    </div>
                    <h5 className="service-title">{title}</h5>
                    <p>{description}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandDoctor);
