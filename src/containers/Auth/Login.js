import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import apiUserService from "../../services/userService";

// import * as actions from "../../store/actions";
import * as actions from "../../store/actions";
// src/store/actions/userActions.js

// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import "./Login.scss";
// import { FormattedMessage } from "react-intl";

// import adminService from "../services/adminService";
// import adminService from "../../services/adminService";
import { useState } from "react";

function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  //[handele chang on form]
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };
  //[handele submit]
  let notification = {};
  const handleSubmit = async (e) => {
    try {
      const data = await apiUserService.handleLogin(
        formData.username,
        formData.password
      );
      console.log("result", data, "data:", data.data.user);
      props.userLoginSuccess(data.data.user);
    } catch (error) {
      console.error(`Khong goi đuoc /api/login , xay ra loi :${error}`);
    }
  };
  // console.log("notification", notification);
  // Sử dụng Axios để gọi API

  const [showPass, setShowPass] = useState(false);
  const handleOnChangePassword = (e) => {
    setShowPass(!showPass);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 login-text">Login</div>
          <div className="col-12 form-group login-input">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              required="required"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 form-group login-input">
            <label>Password:</label>
            <div className="col-12 custom-input-password">
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                name="password"
                required="required"
                onChange={handleChange}
              />
              <span onClick={handleOnChangePassword}>
                <i
                  className={showPass ? "fas fa-eye eye" : "fas fa-eye-slash"}
                ></i>
              </span>
            </div>
          </div>
          <div className={`col-12 ${notification.class}`}>{message}</div>
          <div className="col-12 form-group">
            <button className="col-12 btn-login" onClick={handleSubmit}>
              Login
            </button>
          </div>

          <div className="col-12">
            <span className="forgot-password">Forgot your password?</span>
          </div>
          <div className="col-12 text-center">
            <span className="">Or Login with</span>
          </div>
          <div className="col-12 social-login text-center">
            <i className="fab fa-google google"></i>
            <i className="fab fa-facebook facebook"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
