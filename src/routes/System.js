import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ProductManage from "../containers/System/ProductManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import UserDoctor from "../containers/System/Admin/DoctorManage";
import UserAdmin from "../containers/System/Admin/UserAdmin";
import ClinicManage from "../containers/System/Clinic/ClinicManage";
import SpecialtyManage from "../containers/System/Specialty/SpecialtyManage";
import HandBookManage from "../containers/System/Admin/HandbookManage";
import PostManage from "../containers/System/Admin/PostManage";
import DoctorSchedule from "../containers/System/Admin/DoctorSchedule";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Home";
import DoctorManage from "../containers/System/Admin/DoctorManage";

// class System extends Component {
//     render() {
//         const { systemMenuPath } = this.props;
//         return (
//             <div className="system-container">
//                 <div className="system-list">
//                     <Switch>
//                         <Route path="/system/user-manage" component={UserManage} />
//                         <Route path="/system/product-manage" component={ProductManage} />
//                         <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
//                         <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
//                     </Switch>
//                 </div>
//             </div>
//         );
//     }
// }
function System() {
  const { loggedIn, systemMenuPath } = useSelector((state) => {
    return {
      loggedIn: state.user.isLoggedIn,
      systemMenuPath: state.app.systemMenuPath,
    };
  });
  return (
    <React.Fragment>
      {loggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/product-manage" component={ProductManage} />
            <Route
              path="/system/register-package-group-or-account"
              component={RegisterPackageGroupOrAcc}
            />
            <Route path="/system/user-redux" component={UserRedux} />
            <Route path="/system/user-doctor" component={DoctorManage} />
            <Route path="/system/user-admin" component={UserAdmin} />
            <Route path="/system/clinic-manage" component={ClinicManage} />
            <Route
              path="/system/specialty-manage"
              component={SpecialtyManage}
            />
            <Route path="/system/handbook-manage" component={HandBookManage} />
            <Route path="/system/post-manage" component={PostManage} />

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

// const mapStateToProps = (state) => {
//   return {
//     systemMenuPath: state.app.systemMenuPath,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };
//connect(mapStateToProps, mapDispatchToProps)(System)
export default System;
