import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { dispatch } from "../../redux";

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

// action get all info-doctor

// export const fetchRequiedDoctorInfo = () => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(fetchRequiedDoctorInfoStart());
//       const [resPrice, resPayment, resProvince] = await Promise.all([
//         userService.getAllCode("PRICE"),
//         userService.getAllCode("PAYMENT"),
//         userService.getAllCode("PROVINCE"),
//       ]);
//       console.log("----------------------------");

//       console.log("1------", "resPrice", resPrice.data);
//       console.log("2------", "resPayment", resPayment.data);
//       console.log("3------", "resProvince", resProvince.data);

//       console.log("-------------------------------------");
//       const { dataKeyPrice } = resPrice.data;
//       const { dataKeyPayment } = resPrice.data;
//       const { dataKeyProvince } = resPrice.data;

//       if (
//         dataKeyPrice &&
//         dataKeyPayment &&
//         dataKeyProvince &&
//         dataKeyPrice.errCode === 0 &&
//         dataKeyPayment.errCode === 0 &&
//         dataKeyProvince.errCode === 0
//       ) {
//         alert("successs");
//         dispatch(
//           fetchRequiedDoctorInfoSuccess({
//             resPrice,
//             resPayment,
//             resProvince,
//           })
//         );
//       } else {
//         dispatch(fetchRequiedDoctorInfoFail());
//       }
//     } catch (error) {
//       dispatch(fetchRequiedDoctorInfoFail());
//       console.error("---", error.message);
//     }
//   };
// };
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
      console.log("dataKeyPrice: ", dataKeyPrice);

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
