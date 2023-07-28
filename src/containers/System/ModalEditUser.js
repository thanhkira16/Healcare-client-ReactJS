import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "1",
      roleId: "1",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    console.log("did mount", user);
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "",
        firstName: user.firstName,
        lastName: user.lastName,
        phonenumber: user.phonenumber,
        address: user.address,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
  }

  handleCloseModal = () => {
    this.props.onCloseEditModal();
  };

  handleSaveChanges = (e) => {
    e.preventDefault();

    let isValidForm = this.validateForm();
    if (!isValidForm) {
      alert("Please enter");
    } else {
      this.props.editUser(this.state);
    }

    this.handleCloseModal();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { email, password, firstName, lastName, phonenumber, address } =
      this.state;

    // Define your validation rules here (you can customize them as needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;
    const phoneRegex = /^[0-9]+$/;

    // Check if all required fields are filled
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phonenumber ||
      !address
    ) {
      return false;
    }

    // Check if email is valid
    if (!email.match(emailRegex)) {
      return false;
    }

    // Check if password meets minimum length
    if (password.length < passwordMinLength) {
      return false;
    }

    // Check if phone number contains only numbers
    if (!phonenumber.match(phoneRegex)) {
      return false;
    }

    // Add more validation rules as needed

    return true;
  };

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      gender,
      roleId,
    } = this.state;

    return (
      <Modal show={true} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={this.handleSaveChanges}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                disabled
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phonenumber"
                value={phonenumber}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>User Role</label>
              <select
                name="roleId"
                value={roleId}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
              >
                <option value="1">Admin</option>
                <option value="2">Patient</option>
                <option value="3">Doctor</option>
              </select>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSaveChanges}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
