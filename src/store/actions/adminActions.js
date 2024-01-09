import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Alert } from "bootstrap";

export const allKeys = ["ROLE", "STATUS", "TIME", "POSITION", "GENDER"];
//GET allcode
export const fetchKeysStart = (keysArray) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_KEYS_START });

      const promises = keysArray.map(async (key) => {
        const response = await userService.getAllCode(key);
        return { [key]: response.data.data };
      });
      const allDataArray = await Promise.all(promises);
      const allData = Object.assign({}, ...allDataArray); //tạo một obj mới k chung địa chỉ với allDaraArray
      dispatch(fetchDataSuccess(allData));
    } catch (error) {
      console.error("Error fetching data for all keys:", error.message);
      dispatch(fetchDataFail());
    }
  };
};
const fetchDataSuccess = (data) => ({
  type: actionTypes.FETCH_KEYS_SUCCESS,
  data,
});

const fetchDataFail = () => ({
  type: actionTypes.FETCH_KEYS_FAIL,
});
// ACTION CREATE USER
export const fetchCreateUserStart = (data) => {
  return async (dispatch, useState) => {
    try {
      dispatch({ type: actionTypes.FETCH_CREATE_USER_START });
      const response = await userService.createUser(data);
      if (response.data && response?.data?.errCode === 0) {
        toast.success(
          <FormattedMessage id="user-manage.success-create-user" />
        );
        dispatch(fetchCreateUserSuccess(response.data.user));
      } else {
        toast.error(<FormattedMessage id="user-manage.error-create-user" />);
        dispatch(fetchCreateUserFail());
      }
    } catch (error) {
      console.error("Error create user in admin.Action.js: ", error);
      toast.error(<FormattedMessage id="user-manage.error-create-user" />);
      dispatch(fetchCreateUserFail());
    }
  };
};
const fetchCreateUserSuccess = (data) => ({
  type: actionTypes.FETCH_CREATE_USER_SUCCESS,
  data,
});

const fetchCreateUserFail = () => ({
  type: actionTypes.FETCH_CREATE_USER_FAIL,
});
//ACTION GET USER
export const fetchGetUserStart = () => {
  return async (dispatch) => {
    try {
      const response = await userService.getAllUsers();
      if (response.data && response.data.errCode === 0) {
        dispatch(fetchGetUserSuccess(response.data.user));
      } else {
        dispatch(fetchGetUserFail());
      }
    } catch (error) {
      dispatch(fetchGetUserFail());
      console.error("Error fetch get all user", error.message);
    }
  };
};
const fetchGetUserSuccess = (data) => ({
  type: actionTypes.FETCH_GET_USER_SUCCESS,
  data,
});

const fetchGetUserFail = () => ({
  type: actionTypes.FETCH_GET_USER_FAIL,
});
//ACTION DELETE USER
export const fetchDeleteUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await userService.deleteUser(user.id);
      if (response.data && response.data.errCode === 0) {
        dispatch(fetchDeleteUserSuccess(response.data.userId));
      } else {
        toast.success(<FormattedMessage id="user-manage.error-delete-user" />);
        dispatch(fetchDeleteUserFail(response.data));
      }
    } catch (error) {
      toast.success(<FormattedMessage id="user-manage.error-delete-user" />);
      console.error("Delete User Error ", error.message);
      dispatch(fetchDeleteUserFail());
    }
  };
};
const fetchDeleteUserSuccess = (userId) => ({
  type: actionTypes.FETCH_DELETE_USER_SUCCESS,
  userId,
});

const fetchDeleteUserFail = () => ({
  type: actionTypes.FETCH_CREATE_USER_FAIL,
});
//ACTION UPDATE
export const fetchUpdateUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await userService.updateUser(user);
      if (response.data && response.data.errCode === 0) {
        toast.success(<FormattedMessage id="user-manage.sucess-update-user" />);
        dispatch(fetchUpdateSuccess(response.data.user));
      } else {
        toast.success(<FormattedMessage id="user-manage.error-update-user" />);
        dispatch(fetchUpdateFail());
      }
    } catch (error) {
      toast.success(<FormattedMessage id="user-manage.error-update-user" />);
      console.error("Update user error in fetchUpdateUser:", error.message);
      dispatch(fetchUpdateFail());
    }
  };
};
const fetchUpdateSuccess = (data) => ({
  type: actionTypes.FETCH_UPDATE_USER_SUCCESS,
  data,
});

const fetchUpdateFail = () => ({
  type: actionTypes.FETCH_UPDATE_USER_FAIL,
});
