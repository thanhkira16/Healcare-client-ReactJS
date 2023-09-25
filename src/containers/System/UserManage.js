import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      showModalUser: false,
      showModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  //handle event on view
  handleAddNewUser() {
    this.setState({ showModalUser: true });
  }
  handleEditUser(user) {
    this.setState({ showModalEditUser: true, userEdit: user });
  }
  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode !== 0) {
        alert(response.errMsg);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (err) {
      console.error(err);
    }
  };

  doEditUser = async (data) => {
    // console.log("update user from user manager", data);
    try {
      let response = await editUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMsg);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (err) {
      console.error(err);
    }
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMsg);
      } else {
        await this.getAllUsersFromReact();
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (err) {
      console.error(err);
    }
    console.log("create user from user manager", data);
  };

  //handle open - close modal
  handleCloseModal = () => {
    this.setState({ showModalUser: false });
  };

  handleCloseEditModal = () => {
    this.setState({ showModalEditUser: false });
  };

  // handleCloseModalEditUser = () => {
  //   this.setState({ showModalEditUser: false });
  // };

  render() {
    const { arrUsers, showModalUser, showModalEditUser } = this.state;
    return (
      <div className="container">
        <div className="text-center">Somthing different</div>
        <div className="table-user">
          <div className="mx-1">
            <button
              className="btn btn-primary px-5 d-flex align-items-center gap-2 mb-3"
              onClick={() => this.handleAddNewUser()}
            >
              <span>Add New User</span>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          {showModalUser && (
            <ModalUser
              onCloseModal={this.handleCloseModal}
              createNewUser={this.createNewUser}
            />
          )}

          {showModalEditUser && (
            <ModalEditUser
              onCloseEditModal={this.handleCloseEditModal}
              currentUser={this.state.userEdit}
              editUser={this.doEditUser}
            />
          )}

          <table id="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.address}</td>
                    <td>
                      {/* Add action buttons or links here for each user */}
                      {/* For example, a button to view user details */}

                      <button
                        className="btn red px-3"
                        onClick={() => this.handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleDeleteUser(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Example handler for the "View Details" button
  handleViewDetails = (userId) => {
    // Implement the logic to handle the action, e.g., navigate to a user details page
    console.log("View details for user with ID:", userId);
  };
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
