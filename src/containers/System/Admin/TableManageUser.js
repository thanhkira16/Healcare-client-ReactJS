import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      userEdit: {},
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({ usersRedux: this.props.listUsers });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    console.log("Table manage", user);
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <div className="title mb-3">
          {" "}
          <FormattedMessage id="manage-user.manageUserTitle" />
        </div>

        <div className="table-responsive mb-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage id="manage-user.email" />
                </th>
                <th scope="col">
                  <FormattedMessage id="manage-user.firstname" />
                </th>
                <th scope="col">
                  <FormattedMessage id="manage-user.lastname" />
                </th>
                <th scope="col" className="d-none d-md-table-cell">
                  <FormattedMessage id="manage-user.address" />
                </th>
                <th scope="col" className="d-none d-md-table-cell">
                  <FormattedMessage id="manage-user.phonenumber" />
                </th>
                <th scope="col" className="d-none d-md-table-cell">
                  <FormattedMessage id="manage-user.gender" />
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td className="d-none d-md-table-cell">{item.address}</td>
                      <td className="d-none d-md-table-cell">
                        {item.phonenumber}
                      </td>
                      <td className="d-none d-md-table-cell">{item.gender}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <FormattedMessage id="manage-user.btnEdit" />
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <FormattedMessage id="manage-user.btnDelete" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (user) => dispatch(actions.deleteUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
