import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMsg: "",
      isShowPassword: false,
    };
  }

  // Event handler for the username input
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    console.log(event.target.value);
  };

  // Event handler for the password input
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(event.target.value);
  };

  // Event handler for the login button
  handleLogin = async () => {
    this.setState({
      errMsg: "",
    });

    try {
      const { username, password } = this.state;
      let data = await handleLoginApi(username, password);
      console.log(data.user);
      if (data && data.errCode !== 0) {
        this.setState({
          errMsg: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login successful");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMsg: e.response.data.message,
          });
        }
      }
      console.log(e.response);
    }
  };
  // Event handler for the toggle password button
  handleTogglePassword = () => {
    this.setState((prevState) => ({
      isShowPassword: !prevState.isShowPassword,
    }));
  };
  render() {
    return (
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Lotus Team
                        </h4>
                      </div>
                      <form>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Username
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Phone number or email address"
                            value={this.state.username}
                            onChange={(event) =>
                              this.handleUsernameChange(event)
                            }
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                          <input
                            type={
                              this.state.isShowPassword ? "text" : "password"
                            }
                            className="form-control"
                            value={this.state.password}
                            onChange={(event) =>
                              this.handlePasswordChange(event)
                            }
                          />

                          <button
                            type="button"
                            className="btn btn-outline-primary "
                            onClick={() => this.handleTogglePassword()}
                          >
                            {this.state.isShowPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                          {this.state.errMsg}
                        </div>
                        <div className="row text-center pr-5 pl-5 pt-1 pb-1 pb-1 d-flex justify-content-around">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 pl-4 pr-4"
                            type="button"
                            onClick={() => this.handleLogin()}
                          >
                            Log in
                          </button>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
