import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductManage from "../containers/System/ProductManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import UserAdmin from "../containers/System/Admin/UserAdmin";
import ClinicManage from "../containers/System/Clinic/ClinicManage";
import SpecialtyManage from "../containers/System/Specialty/SpecialtyManage";
import HandBookManage from "../containers/System/Admin/HandbookManage";
import StatisticsManage from "../containers/System/Admin/StatisticsManage";
import StatisticsPatients from "../containers/System/Admin/statistics/StatisticsPatients";
import StatisticsDoctors from "../containers/System/Admin/statistics/StatisticsDoctors";
import StatisticsSpecialtys from "../containers/System/Admin/statistics/StatisticsSpecialtys";

import DoctorSchedule from "../containers/System/Admin/DoctorSchedule";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Home";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import requireAuth from "../hoc/requireAuth.js";
import { USER_ROLE } from "../utils/constant.js";

function System() {
  const { userInfo, loggedIn, systemMenuPath } = useSelector((state) => {
    return {
      loggedIn: state.user.isLoggedIn,
      systemMenuPath: state.app.systemMenuPath,
      userInfo: state.user.userInfo,
    };
  });
  console.log("systemMenuPath: ", systemMenuPath);
  console.log("userInFo: ", userInfo);
  const isAdmin = userInfo && userInfo.roleId === USER_ROLE.ADMIN;
  console.log("isAdmin :", isAdmin);
  return (
    <React.Fragment>
      {loggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            {isAdmin ? (
              <>
                <Route
                  path="/system/product-manage"
                  component={ProductManage}
                />
                <Route
                  path="/system/register-package-group-or-account"
                  component={RegisterPackageGroupOrAcc}
                />
                <Route path="/system/user-manage" component={UserRedux} />
                <Route path="/system/user-doctor" component={DoctorManage} />
                <Route path="/system/clinic-manage" component={ClinicManage} />
                <Route
                  path="/system/specialty-manage"
                  component={SpecialtyManage}
                />
                <Route
                  path="/system/handbook-manage"
                  component={HandBookManage}
                />
                <Route
                  path="/system/statistics-manage"
                  component={StatisticsManage}
                />
                <Route
                  path="/system/statistics-patients"
                  component={StatisticsPatients}
                />
                <Route
                  path="/system/statistics-doctors"
                  component={StatisticsDoctors}
                />
                <Route
                  path="/system/statistics-specialtys"
                  component={StatisticsSpecialtys}
                />
              </>
            ) : (
              <Route
                component={() => {
                  return <Redirect to={"/login"} />;
                }}
              />
            )}
            ///doctor/manage-schedule
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(System);
