import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { USER_ROLE } from "../utils/constant.js";

// class Home extends Component {
//   render() {
//     const { isLoggedIn } = this.props;
//     let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";

//     return <Redirect to={linkToRedirect} />;
//   }
// }

function Home() {
  const { isLoggedIn, userInfo } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  }));
  console.log("userInfo: ", userInfo);

  // let linkToRedirect = isLoggedIn
  //   ? userInfo.roleId === USER_ROLE.ADMIN
  //     ? "/system/user-manage"
  //     : "/doctor/manage-schedule"
  //   : "/login";
  const isAdmin = userInfo?.roleId === USER_ROLE.ADMIN;
  let linkToRedirect = isLoggedIn
    ? isAdmin
      ? "/system/user-manage"
      : "/doctor/manage-schedule"
    : "/login";
  console.log("linkToRedirect: ", linkToRedirect);
  // return <Redirect to={linkToRedirect} />;
  // let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";
  return <Redirect to={linkToRedirect} />;
}
export default Home;
