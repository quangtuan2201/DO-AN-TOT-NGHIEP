// requireAuth.js
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { USER_ROLE } from '../utils/constants';

const requireAuth = (allowedRoles, WrappedComponent) => {
  const AuthComponent = () => {
    const userInfo = useSelector((state) => state.user.userInfo);
    console.log("userInfo: ".userInfo);
    console.log("ROLE Auth: ", allowedRoles);

    if (!userInfo || !allowedRoles.includes(userInfo.roleId)) {
      // Chuyển hướng nếu không có quyền truy cập
      console.log("redirect login");
      return <Redirect to="/login" />;
    }

    // Render component nếu có quyền
    console.log("WrappedComponent: ", WrappedComponent);
    return <WrappedComponent />;
  };

  return AuthComponent;
};

export default requireAuth;
