import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ProductManage from "../containers/System/ProductManage";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Home";

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
function System(systemMenuPath) {
  console.log("systemMenuPath", systemMenuPath);
  const loggedIn = useSelector((state) => {
    return state.user.isLoggedIn;
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

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
