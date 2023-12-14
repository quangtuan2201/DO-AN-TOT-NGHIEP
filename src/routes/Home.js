import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

// class Home extends Component {
//   render() {
//     const { isLoggedIn } = this.props;
//     let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";

//     return <Redirect to={linkToRedirect} />;
//   }
// }

function Home() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";
  return <Redirect to={linkToRedirect} />;
}
export default Home;
