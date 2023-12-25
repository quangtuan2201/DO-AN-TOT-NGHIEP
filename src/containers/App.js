import React, { useEffect, Fragment } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
// import Header from "./Header/Home.js";
import System from "../routes/System";
// import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import DetailSpecialty from "./Patient/Doctor/DetailSpecialty.js";

import Doctor from "../routes/Doctor.js";
import VerifyEmail from "./Patient/VerifyEmail.js";
// import { changeLanguageApp } from ".././store/actions/appActions.js";
// import * as actions from "./../store/actions";

const App = () => {
  const handlePersistorState = () => {
    // You may need to adjust this part based on your specific use case
    // The logic appears to depend on the persistor, which might not be necessary with hooks
    // If necessary, you could use local state or other hooks to handle this logic
    // Example: const { bootstrapped } = useSomeCustomHook();
    // setBootstrapped(bootstrapped);
  };

  useEffect(() => {
    handlePersistorState();
  }, []);

  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <ConfirmModal />
          <div className="content-container">
            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={DetailSpecialty}
                />
                <Route
                  path={path.DOCTOR_MANAGE}
                  component={userIsAuthenticated(Doctor)}
                  // component={userIsNotAuthenticated(Doctor)}
                />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={VerifyEmail}
                />
              </Switch>
            </CustomScrollbars>
          </div>

          {/* <ToastContainer
            className="toast-container"
            toastClassName="toast-item"
            bodyClassName="toast-item-body"
            autoClose={false}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLoss={true}
            closeOnClick={false}
            draggable={false}
            closeButton={<CustomToastCloseButton />}
          /> */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
