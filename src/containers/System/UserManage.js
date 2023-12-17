import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import "./UserManage.scss";
import apiUserService from "../../services/userService";
import ModalUser from "./ModalUser";
import userService from "../../services/userService";

function UserManage(props) {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiUserService.getAllUsers();
        setUsers(response.data.user);
        // console.log("response", response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        // Xử lý lỗi nếu cần
      }
    };

    fetchUsers();
    return;
  }, [selectedUser]);
  // show modal edit & create
  const handleShowEditModal = (user) => {
    // console.log("show :", selectedUser);
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    // console.log("close:", selectedUser);
    setEditModalOpen(false);
    setSelectedUser(null);
  };
  // delete  user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await userService.deleteUser(userId);
      console.log("deletet user response", response);
      if (response.status) {
        const userNew = users.filter((item) => item.id !== userId);
        setUsers(userNew);
      }
      // console.log("use sau khi click delete:", users);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="user-container container">
      <div className="title text-center">Manage users with Quang Tuan</div>
      <div className="mx-1">
        <button
          className="btn btn-primary px-3 btn-add-user"
          onClick={() => {
            handleShowEditModal();
          }}
        >
          <i class="fas fa-plus">Add new users</i>
        </button>
      </div>
      <div className="users-table mt-3 mx-1">
        {/* <h1 className="text-center">Danh sách user </h1> */}
        <table id="customers">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Address</th>
            <th>PhoneNumber</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.gender == 1 ? "MALE" : "FEMALE"}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => {
                    handleShowEditModal(user);
                  }}
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    console.log("delete user");
                    handleDeleteUser(user.id);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="col-12">
          {/* EditUserModal */}
          <ModalUser
            isOpen={isEditModalOpen}
            toggle={handleCloseEditModal}
            user={selectedUser}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
