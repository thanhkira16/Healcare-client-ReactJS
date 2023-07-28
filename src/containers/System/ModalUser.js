import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "1",
      roleId: "1",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: "1",
        roleId: "1",
      });
    });
  }

  componentDidMount() {
    // You can perform any initial setup here if needed
  }

  handleCloseModal = () => {
    // Call the onCloseModal prop to close the modal in the parent component
    this.props.onCloseModal();
  };

  handleSaveChanges = (e) => {
    e.preventDefault();
    // Implement the logic to save the user details
    // For example, call an action to save the user details to Redux store or API
    let isValidForm = this.validateForm();
    if (!isValidForm) {
      alert("Please enter");
    } else {
      console.log(this.props);
      this.props.createNewUser(this.state);
    }
    // After saving, you can close the modal if needed
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
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={this.handleSaveChanges}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                className="form-control"
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
