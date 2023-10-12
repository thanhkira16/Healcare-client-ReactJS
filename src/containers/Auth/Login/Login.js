import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      errMsg: "",
      isShowPassword: false,
      isOpenLogin: true,
      isShowConfirmPassword: false,
      isValidSignUp: {
        username: true,
        password: true,
        confirmPassword: true,
        phoneNumber: true,
      },
      isValidLogin: {
        username: true,
        password: true,
      },
    };
  }

  componentDidMount() {
    document.title = "VKU Healcare - login or sign up";
  }
  resetState = () => {
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      errMsg: "",
      isShowPassword: false,
      isShowConfirmPassword: false,
      isValid: {
        username: true,
        password: true,
        confirmPassword: true,
        phoneNumber: true,
      },
    });
  };
  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;

    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleSwitchLoginAndSignUp = () => {
    this.resetState();
    setTimeout(() => {
      this.setState((prevState) => ({
        isOpenLogin: !prevState.isOpenLogin,
      }));
    }, 200); // 1000 milliseconds (1 second) delay
  };
  validateLogin = () => {
    const { username, password } = this.state;
    const isValidLogin = {
      username: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(username),
      // password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password),
      password: password.trim() !== "",
      // confirmPassword: confirmPassword === password,
      // phoneNumber: /^[0-9]+$/.test(phoneNumber),
    };

    this.setState({ isValidLogin });
    return Object.values(isValidLogin).every((value) => value);
  };
  validateSignUp = () => {
    const { username, password, confirmPassword, phoneNumber } = this.state;
    const isValidSignUp = {
      username: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(username),
      // password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password),
      password: password.trim() !== "",
      confirmPassword: confirmPassword === password,
      phoneNumber: /^[0-9]+$/.test(phoneNumber), // Example: only digits
    };

    this.setState({ isValidSignUp });
    return Object.values(isValidSignUp).every((value) => value);
  };

  // Event handler for the login button
  handleLogin = async () => {
    if (this.validateLogin()) {
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
        } else {
          console.log("errMsg", this.state.errMsg);
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
    }
  };
  // Event handler for the toggle password button
  handleTogglePassword = (id) => {
    if (id === "password") {
      this.setState((prevState) => ({
        isShowPassword: !prevState.isShowPassword,
      }));
    } else {
      this.setState((prevState) => ({
        isShowConfirmPassword: !prevState.isShowConfirmPassword,
      }));
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    console.log(" state", this.state);
    const { isOpenLogin, isValidLogin, isValidSignUp } = this.state;
    // console.log("object valid", isValid);
    return (
      <>
        <div className="container-fluid">
          <div className="row login-container">
            <div className="left col-7 d-none d-lg-block">
              <h1>Facebook</h1>
              <p>
                Facebook helps you connect and share with the people in your
                life.
              </p>
            </div>
            {isOpenLogin ? (
              //render login
              <div className="right col-5 is">
                <form action="" className="gap-3">
                  <input
                    type="text"
                    className={
                      isValidLogin.username
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="Email address or phone number"
                    value={this.state.username}
                    name="username"
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "username")
                    }
                  />
                  <div className="password-input">
                    <input
                      type={this.state.isShowPassword ? "text" : "password"}
                      placeholder="Password"
                      className={
                        isValidLogin.password
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      value={this.state.password}
                      name="password"
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "password")
                      }
                      onKeyDown={(event) => this.handleKeyDown(event)}
                    />
                    {this.state.password && this.state.password !== "" && (
                      <span
                        className="show-hide"
                        onClick={() => this.handleTogglePassword("password")}
                        onKeyDown={(event) => this.handleKeyDown(event)}
                      >
                        {this.state.isShowPassword &&
                        this.state.isShowPassword == true ? (
                          <i class="fas fa-eye-slash"></i>
                        ) : (
                          <i class="fas fa-eye"></i>
                        )}
                      </span>
                    )}
                  </div>
                  <span className="loginBtn" onClick={() => this.handleLogin()}>
                    Log In
                  </span>
                  <a href="" className="forget">
                    Forgotten password?
                  </a>
                  <div className="sign-up">
                    <span
                      onClick={this.handleSwitchLoginAndSignUp}
                      className="signupBtn"
                    >
                      Create New Account
                    </span>
                  </div>
                </form>
                <p>
                  <b>Create a Page</b> for a celebrity, band, or business.
                </p>
              </div>
            ) : (
              //render sign up
              <div className="right col-5">
                <form action="" className="gap-3">
                  <input
                    type="text"
                    placeholder="Email address"
                    value={this.state.username}
                    name="username"
                    className={
                      isValidSignUp.username
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "username")
                    }
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={this.state.phoneNumber}
                    name="phoneNumber"
                    className={
                      isValidSignUp.phoneNumber
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  />

                  <div className="password-input">
                    <input
                      type={this.state.isShowPassword ? "text" : "password"}
                      placeholder="Password"
                      value={this.state.password}
                      name="password"
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "password")
                      }
                      className={
                        isValidSignUp.password
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      onKeyDown={(event) => this.handleKeyDown(event)}
                    />
                    {this.state.password && this.state.password !== "" && (
                      //first password
                      <span
                        className="show-hide"
                        onClick={() => this.handleTogglePassword("password")}
                        onKeyDown={(event) => this.handleKeyDown(event)}
                      >
                        {this.state.isShowPassword &&
                        this.state.isShowPassword == true ? (
                          <i class="fas fa-eye-slash"></i>
                        ) : (
                          <i class="fas fa-eye"></i>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="password-input">
                    <input
                      type={
                        this.state.isShowConfirmPassword ? "text" : "password"
                      }
                      placeholder="Re-enter Password"
                      value={this.state.confirmPassword}
                      name="confirmPassword"
                      className={
                        isValidSignUp.confirmPassword
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "confirmPassword")
                      }
                      onKeyDown={(event) => this.handleKeyDown(event)}
                    />
                    {this.state.confirmPassword &&
                      this.state.confirmPassword !== "" && (
                        //second password
                        <span
                          className="show-hide"
                          onClick={() =>
                            this.handleTogglePassword("confirmPassword")
                          }
                          onKeyDown={(event) => this.handleKeyDown(event)}
                        >
                          {this.state.isShowConfirmPassword &&
                          this.state.isShowConfirmPassword == true ? (
                            <i class="fas fa-eye-slash"></i>
                          ) : (
                            <i class="fas fa-eye"></i>
                          )}
                        </span>
                      )}
                  </div>
                  <span className="loginBtn" onClick={() => this.handleLogin()}>
                    Sign Up
                  </span>
                  <a
                    className="forget"
                    onClick={this.handleSwitchLoginAndSignUp}
                  >
                    Already haved an account?
                  </a>
                </form>
              </div>
            )}
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
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
