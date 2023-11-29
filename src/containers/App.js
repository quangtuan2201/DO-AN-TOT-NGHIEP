import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Header from "./Header/Home.js";
import System from "../routes/System";
import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars.js";
import { changeLanguageApp } from ".././store/actions/appActions.js";

const App = () => {
  const [bootstrapped, setBootstrapped] = useState(false);
  const dispatch = useDispatch();

  const started = useSelector((state) => state.app.started);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handlePersistorState = () => {
    // You may need to adjust this part based on your specific use case
    // The logic appears to depend on the persistor, which might not be necessary with hooks
    // If necessary, you could use local state or other hooks to handle this logic
    // Example: const { bootstrapped } = useSomeCustomHook();
    // setBootstrapped(bootstrapped);
  };

  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem("appLanguage");
  //   console.log("storedLanguage", storedLanguage);
  //   if (storedLanguage) {
  //     // Nếu có trạng thái ngôn ngữ đã lưu trữ, đặt ngôn ngữ mặc định
  //     dispatch(changeLanguageApp(storedLanguage));
  //   }
  // }, []);

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
              </Switch>
            </CustomScrollbars>
          </div>

          <ToastContainer
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
          />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
