import { dispatch } from "../../redux";
import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import specialtyService from "../../services/specialtyService";
import clinicService from "../../services/clinicService";

//ACTION LOGIN
export const fetchGetAllSpecialty = () => {
  return async (dispatch) => {
    try {
      const response = await specialtyService.handlGetAllSpecialty();
      // console.log("response get all specialty :", response);
      if (response) {
        //    <FormattedMessage id="login.success-login" />;
        dispatch(fetchGetAllSpecialtySuccess(response));
        toast.success("Lấy danh sách chuyên khoa thành công.");
      } else {
        //    <FormattedMessage id="login.error-login" />;
        toast.error("Lấy danh sách chuyên khoa thất bại.");
        dispatch(fetchGetAllSpecialtyFail());
      }
    } catch (error) {
      console.error("Action Get all Specialty fail: ", error.message);
    }
  };
};
const fetchGetAllSpecialtySuccess = (data) => ({
  type: actionTypes.FETCH_GET_ALL_SPECIALTY_SUCCESS,
  data,
});
const fetchGetAllSpecialtyFail = () => ({
  type: actionTypes.FETCH_GET_ALL_SPECIALTY_FAIL,
});
//ACTION GET ALL CLINIC
export const fetchGetAllClinic = () => {
  return async (dispatch) => {
    try {
      const response = await clinicService.handlGetAllClinic();
      // console.log("response get all clinic :", response);
      if (response) {
        //    <FormattedMessage id="login.success-login" />;
        dispatch(fetchGetAllClinicSuccess(response));
        toast.success("Lấy danh sách phòng khám thành công.");
      } else {
        //    <FormattedMessage id="login.error-login" />;
        toast.error("Lấy danh sách phòng khám thất bại.");
        dispatch(fetchGetAllClinicFail());
      }
    } catch (error) {
      console.error("Action Get all Clinic fail: ", error.message);
    }
  };
};
const fetchGetAllClinicSuccess = (data) => ({
  type: actionTypes.FETCH_GET_ALL_CLINIC_SUCCESS,
  data,
});
const fetchGetAllClinicFail = () => ({
  type: actionTypes.FETCH_GET_ALL_CLINIC_FAIL,
});
