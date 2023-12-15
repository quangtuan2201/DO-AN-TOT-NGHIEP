import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Home";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";

function Doctor() {
  const { loggedIn, systemMenuPath } = useSelector((state) => {
    return {
      loggedIn: state.user.isLoggedIn,
      systemMenuPath: state.app.systemMenuPath,
    };
  });
  // console.log("systemMenuPath", systemMenuPath);
  return (
    <React.Fragment>
      {loggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Doctor;
