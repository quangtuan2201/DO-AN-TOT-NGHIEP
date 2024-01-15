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
import HistorysManage from "../containers/System/Admin/HistorysMange";

import DoctorSchedule from "../containers/System/Admin/DoctorSchedule";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Home";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import requireAuth from "../hoc/requireAuth.js";
import { USER_ROLE } from "../utils/constant.js";

function System() {
  const ProtectedClinicManage = requireAuth([USER_ROLE.ADMIN], ClinicManage);
  const ProtectedSpecialtyManage = requireAuth(
    [USER_ROLE.ADMIN],
    SpecialtyManage
  );
  const ProtectedHandBookManage = requireAuth(
    [USER_ROLE.ADMIN],
    HandBookManage
  );
  const ProtectedStatisticsManage = requireAuth(
    [USER_ROLE.ADMIN],
    StatisticsManage
  );
  const ProtectedStatisticsPatients = requireAuth(
    [USER_ROLE.ADMIN],
    StatisticsPatients
  );
  const ProtectedStatisticsDoctors = requireAuth(
    [USER_ROLE.ADMIN],
    StatisticsDoctors
  );
  const ProtectedStatisticsSpecialtys = requireAuth(
    [USER_ROLE.ADMIN],
    StatisticsSpecialtys
  );
  const ProtectedHistorysManage = requireAuth(
    [USER_ROLE.ADMIN],
    HistorysManage
  );
  const ProtectedDoctorManage = requireAuth([USER_ROLE.ADMIN], DoctorManage);
  const ProtectedUserRedux = requireAuth([USER_ROLE.ADMIN], UserRedux);
  console.log("ProtectedUserRedux: ", ProtectedUserRedux);

  const { userInfo, loggedIn, systemMenuPath } = useSelector((state) => {
    return {
      loggedIn: state.user.isLoggedIn,
      systemMenuPath: state.app.systemMenuPath,
      userInfo: state.user.userInfo,
    };
  });
  return (
    <React.Fragment>
      {loggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/product-manage" component={ProductManage} />
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
            <Route path="/system/handbook-manage" component={HandBookManage} />
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
            <Route
              path="/doctor/manage-historys-booking"
              component={HistorysManage}
            />

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

export default memo(System);
