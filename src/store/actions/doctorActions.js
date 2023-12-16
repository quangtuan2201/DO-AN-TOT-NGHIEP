import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

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
