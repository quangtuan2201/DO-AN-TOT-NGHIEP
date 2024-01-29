import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Home";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import HistorysManage from "../containers/System/Admin/HistorysMange";
import { USER_ROLE } from "../utils/constant.js";

function Doctor() {
  const { loggedIn, systemMenuPath, userInfo } = useSelector((state) => {
    return {
      loggedIn: state.user.isLoggedIn,
      systemMenuPath: state.app.systemMenuPath,
      userInfo: state.user.userInfo,
    };
  });
  const isAdmin = userInfo && userInfo.roleId === USER_ROLE.ADMIN;
  const isDoctor = userInfo && userInfo.roleId === USER_ROLE.DOCTOR;
  // console.log("systemMenuPath", systemMenuPath);
  console.log("isDoctor: ", isDoctor);
  return (
    <React.Fragment>
      {loggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            {/* {isDoctor ? (
              <>
                <Route
                  path="/doctor/manage-patient"
                  component={ManagePatient}
                />
                <Route
                  path="/doctor/manage-historys-booking"
                  component={HistorysManage}
                />
                <Route
                  path="/doctor/manage-schedule"
                  component={ManageSchedule}
                />
              </>
            ) : (
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            )} */}
            {isDoctor && (
              <Route path="/doctor/manage-patient" component={ManagePatient} />
            )}
            <Route
              path="/doctor/manage-historys-booking"
              component={HistorysManage}
            />
            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Doctor;
