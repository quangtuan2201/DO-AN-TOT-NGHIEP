import React, { useState, useEffect, memo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import UserAdmin from "./UserAdmin";

function TableManageUser({ allUser, onDeleteUser, onUpdateUser }) {
  console.log("re-render");
  return (
    <>
      <div className="user-container container">
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>
                <FormattedMessage id="user-manage.email" />
              </th>
              <th>
                <FormattedMessage id="user-manage.firstName" />
              </th>
              <th>
                <FormattedMessage id="user-manage.lastName" />
              </th>
              <th>
                <FormattedMessage id="user-manage.address" />
              </th>
              <th>
                <FormattedMessage id="user-manage.phoneNumber" />
              </th>
              <th>
                <FormattedMessage id="user-manage.gender" />
              </th>
              <th>
                <FormattedMessage id="user-manage.position" />
              </th>
              <th>
                <FormattedMessage id="user-manage.role" />
              </th>
              <th>
                <FormattedMessage id="user-manage.action" />
              </th>
            </tr>
            {allUser?.map((user, index) => (
              <tr key={user.id}>
                <td>{user?.email}</td>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.address}</td>
                <td>{user?.phoneNumber}</td>
                <td>
                  {user?.gender === "M"
                    ? "M"
                    : user?.gender === "F"
                    ? "F"
                    : user?.gender === "O"
                    ? "O"
                    : ""}
                </td>
                <td>{user?.positionId}</td>
                <td>{user?.roleId}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      onUpdateUser(user);
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      onDeleteUser(user);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div>
        <UserAdmin items={allUser} itemsPage={2} />
      </div>
    </>
  );
}
export default memo(TableManageUser);
