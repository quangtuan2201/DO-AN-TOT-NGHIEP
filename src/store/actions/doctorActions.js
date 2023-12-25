import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { dispatch } from "../../redux";

// ACTION GET ALL USER
export const fetchGetAllDoctors = () => {
  return async (dispatch) => {
    try {
      const response = await doctorService.handleGetAllDoctors();
      console.log("fetch get all doctor: ", response);
      console.log("response ALL DOCTOR in file adminAction:", response);
      if (response.data && response.errCode === 0) {
        toast.success(
          <FormattedMessage id="user-manage.sucess-get-all-user" />
        );
        dispatch(fetchAllDoctorSuccess(response.data));
      } else {
        toast.error(<FormattedMessage id="user-manage.error-get-all-user" />);
        dispatch(fetchAllDoctoFail());
      }
    } catch (error) {
      toast.error(<FormattedMessage id="user-manage.error-get-all-user" />);
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
//ACTION GET ALL SCHEDULE HOURS
export const fetchAllCodeScheduleHours = () => {
  return async (dispatch) => {
    try {
      const reseponse = await doctorService.handleAllCodeScheduleHours();
      if (reseponse) {
        <FormattedMessage id="user-manage.success-get-allcode-schedule" />;
        dispatch(fetchAllCodeScheduleHoursSuccess(reseponse));
      } else {
        <FormattedMessage id="user-manage.error-get-allcode-schedule" />;
        dispatch(fetchAllCodeScheduleHoursFail());
      }
    } catch (error) {
      <FormattedMessage id="user-manage.error-get-allcode-schedule" />;
      dispatch(fetchAllCodeScheduleHoursFail());
    }
  };
};
const fetchAllCodeScheduleHoursSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
  data,
});
const fetchAllCodeScheduleHoursFail = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIL,
});

// fetchRequiedDoctorInfo
export const fetchRequiedDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchRequiedDoctorInfoStart());

      const [resPrice, resPayment, resProvince] = await Promise.all([
        userService.getAllCode("PRICE"),
        userService.getAllCode("PAYMENT"),
        userService.getAllCode("PROVINCE"),
      ]);

      const { data: dataKeyPrice, errCode: errCodePrice } = resPrice.data;
      const { data: dataKeyPayment, errCode: errCodePayment } = resPayment.data;
      const { data: dataKeyProvince, errCode: errCodeProvince } =
        resProvince.data;
      const isSuccess =
        errCodePrice === 0 && errCodePayment === 0 && errCodeProvince === 0;

      if (isSuccess) {
        dispatch(
          fetchRequiedDoctorInfoSuccess({
            dataKeyPrice,
            dataKeyPayment,
            dataKeyProvince,
          })
        );
      } else {
        dispatch(fetchRequiedDoctorInfoFail());
      }
    } catch (error) {
      dispatch(fetchRequiedDoctorInfoFail());
      console.error("---", error.message);
    }
  };
};
//ACTION FETCH REQUAIE DOCTOR INFO
const fetchRequiedDoctorInfoStart = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
});
const fetchRequiedDoctorInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCESS,
  data,
});
const fetchRequiedDoctorInfoFail = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL,
  data,
});

//ACTION SAVE INFO DOCTOR
export const fetchSaveInfoDoctor = (newInfo) => {
  return async (dispatch, getState) => {
    try {
      // toast.error("ACTION SAVE DOCTOR...");
      console.log("===> Info Doctor in Doctor Action: ", newInfo);
      // console.log("Get State save info; ", getState());
      const response = await doctorService.handleSaveInfoDoctor(newInfo);
      // console.log("response SAVE INFO in file adminAction:", response);
      if (response.data && response.errCode === 0) {
        toast.success(
          <FormattedMessage id="user-manage.sucess-save-info-user" />
        );
        dispatch(fetchGetAllDoctors());
        dispatch(fetchSaveInfoDoctorSuccess(response.data));
      } else {
        toast.error(<FormattedMessage id="user-manage.error-save-info-user" />);
        dispatch(fetchSaveInfoDoctorFail());
      }
    } catch (error) {
      console.log("exception ", error.message);
      toast.error(<FormattedMessage id="user-manage.error-save-info-user" />);
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
      // console.log("Doctor: ", doctor);
      if (doctor) {
        toast.success(
          <FormattedMessage id="user-manage.sucess-get-detail-user" />
        );
        dispatch(fetchGetDetailDoctorSuccess(doctor));
      } else {
        toast.error(
          <FormattedMessage id="user-manage.error-get-detail-user" />
        );
        dispatch(fetchGetDetailDoctorFail());
      }
    } catch (error) {
      toast.error(<FormattedMessage id="user-manage.error-get-detail-user" />);
      dispatch(fetchGetDetailDoctorFail());
      console.error("", error.message);
    }
  };
};
//ACTION GET DETAIL DOCTOR
const fetchGetDetailDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_GET_DETAIL_DOCTOR_SUCCESS,
  data,
});

const fetchGetDetailDoctorFail = () => ({
  type: actionTypes.FETCH_GET_DETAIL_DOCTOR_FAIL,
});
//ACTION UPDATE
export const fetchTopDoctor = (limit) => {
  // console.log("limit1:", limit);
  return async (dispatch, getState) => {
    try {
      // console.log("limit 2: ", limit);
      const response = await userService.fetchGetTopDoctor(limit, "R2");
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
