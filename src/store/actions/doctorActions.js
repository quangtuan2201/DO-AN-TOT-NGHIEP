import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import doctorService from "../../services/doctorService";
import { toast } from "react-toastify";

export const fetchAllCodeScheduleHours = () => {
  return async (dispatch) => {
    try {
      const reseponse = await doctorService.handleAllCodeScheduleHours();
      if (reseponse) {
        toast.success("Get allcode schedule hours success !");
        dispatch(fetchAllCodeScheduleHoursSuccess(reseponse));
      } else {
        toast.error("Get allcode schedule hours fail!");
        dispatch(fetchAllCodeScheduleHoursFail());
      }
    } catch (error) {
      toast.error("Get allcode schedule hours fail!");
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
