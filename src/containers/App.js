import React, { useEffect, Fragment } from "react";
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
import System from "../routes/System";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import DetailSpecialty from "./Patient/Doctor/DetailSpecialty.js";
import DetailClinic from "./Patient/Doctor/DetailClinic.js";
import DetailHanbook from "./Patient/Doctor/DetailHanbook.js";
import Doctor from "../routes/Doctor.js";
import VerifyEmail from "./Patient/VerifyEmail.js";
import Search from "./HomePage/Section/Search/Search.js";
import Support from "./HomePage/Section/Support/Support.js";
import AppointmentSchedule from "./HomePage/Section/AppointmentSchedule/AppointmentSchedule.js";
import LoadingOverlay from "react-loading-overlay";
import ForgotPassword from "./Auth/ForgotPassword.js";
import VerifyCode from "./Auth/VerifyCode.js";
import { useSelector } from "react-redux";

const App = (prop) => {
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
                <Route path={path.DETAIL_HANBOOK} component={DetailHanbook} />
                <Route
                  path={path.DOCTOR_MANAGE}
                  component={userIsAuthenticated(Doctor)}
                />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={VerifyEmail}
                />
                <Route path={path.SEARCH} component={Search} />
                <Route path={path.SUPPORT} component={Support} />
                <Route
                  path={path.APPOINTMENT_SCHEDULE}
                  component={AppointmentSchedule}
                />
                <Route path={path.FORGOT_PASSWORD} component={ForgotPassword} />
                <Route path={path.VERIFY_CODE} component={VerifyCode} />
              </Switch>
            </CustomScrollbars>
          </div>
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
          <LoadingOverlay
            className="text-warning"
            active={false}
            spinner
            text="Loading..."
          ></LoadingOverlay>
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
