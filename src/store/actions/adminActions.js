import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
export const allKeys = ["ROLE", "STATUS", "TIME", "POSITION", "GENDER"];
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
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_CREATE_USER_START });
      const response = await userService.createUser(data);
      // console.log("RESPONSE IN FILE AdminAction :", response);
      if (response.data && response?.data?.errCode === 0) {
        toast.success("Create a user success!");
        dispatch(fetchCreateUserSuccess(response.data.user));
        // console.log(
        //   "Reponse data[response.data.user] in adminAction.js :",
        //   response.data.user.image
        // );
      } else {
        toast.error("Create a user fail!");
        dispatch(fetchCreateUserFail());
      }
    } catch (error) {
      console.log("Error create user in admin.Action.js: ", error);
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
      // const resGetDoctor = await userService.fetchGetDoctor(2, "R2");
      // console.log("resGetDoctor: ", resGetDoctor);
      // console.log("response: get alluser: ", response);
      if (response.data && response.data.errCode === 0) {
        dispatch(fetchGetUserSuccess(response.data.user));
      } else {
        dispatch(fetchGetUserFail());
        // }
        // if (resGetDoctor.data && resGetDoctor.errCode === 0) {
        //   dispatch(fetchGetUserSuccess(resGetDoctor.data.data))
        // }
        // else{
        //   dispatch(fetchGetUserFail());
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
        toast.success("Delete user success!");
        dispatch(fetchDeleteUserSuccess(response.data.userId));
      } else {
        toast.error("Delete a user fail!");
        dispatch(fetchDeleteUserFail(response.data));
      }
    } catch (error) {
      console.log("Delete User Error ", error.message);
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
        toast.success("Update a user success !");
        dispatch(fetchUpdateSuccess(response.data.user));
      } else {
        toast.error("Delete a user fail !");
        dispatch(fetchUpdateFail());
      }
    } catch (error) {
      console.log("Update user error in fetchUpdateUser:", error.message);
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

export const fetchTopDoctor = (limit) => {
  console.log("limit1:", limit);
  return async (dispatch, getState) => {
    try {
      console.log("limit 2: ", limit);
      const response = await userService.fetchGetDoctor(limit, "R2");
      // console.log("response: ", response);
      if (response.data && response.errCode === 0) {
        dispatch(fetcTopDoctorSuccess(response.data));
      } else {
        dispatch(fetcTopDoctorFail());
      }
    } catch (error) {
      dispatch(fetcTopDoctorFail());
      console.error("fetch top doctor exception occurred !", error.message);
    }
  };
};
const fetcTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_GET_TOP_DOCTOR_SUCCESS,
  data,
});
const fetcTopDoctorFail = () => ({
  type: actionTypes.FETCH_GET_TOP_DOCTOR_FAIL,
});
// ACTION GET ALL USER
export const fetchGetAllDoctors = () => {
  return async (dispatch) => {
    try {
      const response = await doctorService.handleGetAllDoctors();
      console.log("response ALL DOCTOR in file adminAction:", response);
      if (response.data && response.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(response.data));
      } else {
        dispatch(fetchAllDoctoFail());
      }
    } catch (error) {
      dispatch(fetchAllDoctoFail());
    }
  };
};
const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_GET_ALL_DOCTOR_SUCCESS,
  data,
});
const fetchAllDoctoFail = () => ({
  type: actionTypes.FETCH_GET_ALL_DOCTOR_FAIL,
});
//ACTION SAVE INFO DOCTOR
export const fetchSaveInfoDoctor = (newInfo) => {
  return async (dispatch) => {
    try {
      console.log("newInfoDoctor in adminAction: ", newInfo);
      const response = await doctorService.handleSaveInfoDoctor(newInfo);
      console.log("response SAVE INFO in file adminAction:", response);
      if (response.data && response.errCode === 0) {
        toast.success("Save info a doctor success !");
        dispatch(fetchSaveInfoDoctorSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchSaveInfoDoctorFail());
    }
  };
};
const fetchSaveInfoDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_SAVE_INFO_DOCTOR_SUCCESS,
  data,
});
const fetchSaveInfoDoctorFail = () => ({
  type: actionTypes.FETCH_GET_ALL_DOCTOR_FAIL,
});
// ACTION GET DETAIL DOCTOR
export const fetchGetDetailDoctor = (id) => {
  return async (dispatch) => {
    try {
      const doctor = await doctorService.handleGetDetailDoctor(id);
      console.log("Doctor: ", doctor);
      if (doctor) {
        toast.success("Get Detail Doctor Succsess !");
        dispatch(fetchGetDetailDoctorSuccess(doctor));
      }
    } catch (error) {
      toast.error("Get Detail Doctor Fail !");
      dispatch(fetchGetDetailDoctorFail());
      console.error("", error.message);
    }
  };
};
const fetchGetDetailDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_GET_DETAIL_DOCTOR_SUCCESS,
  data,
});

const fetchGetDetailDoctorFail = () => ({
  type: actionTypes.FETCH_GET_DETAIL_DOCTOR_FAIL,
});
