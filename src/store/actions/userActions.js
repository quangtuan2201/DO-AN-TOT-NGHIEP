import { dispatch } from "../../redux";
import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

// export const userLoginSuccess = (userInfo) => ({
//   type: actionTypes.USER_LOGIN_SUCCESS,
//   userInfo: userInfo,
// });
// export const userLoginFail = () => ({
//   type: actionTypes.USER_LOGIN_FAIL,
// });
export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
//ACTION LOGIN
export const fetchUserLogin = (user) => {
  console.log("User: ", user);
  return async (dispatch) => {
    try {
      const response = await userService.handleLogin(user);
      console.log("response login :", response);
      if (response.data && response.errCode === 0) {
        <FormattedMessage id="login.success-login" />;
        dispatch(userLoginSuccess(response.data));
      } else {
        <FormattedMessage id="login.error-login" />;
        dispatch(userLoginFail());
      }
    } catch (error) {
      <FormattedMessage id="login.error-login" />;
      dispatch(userLoginFail());
    }
  };
};
const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo,
});
const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});
