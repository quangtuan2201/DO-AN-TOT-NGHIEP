import actionTypes from "../actions/actionTypes";

const initialState = {
  allCodescheduleHours: [],
  allDoctorInfo: [],
  isAllDoctorInfo: false,
};
function doctorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
      return {
        ...state,
        allCodescheduleHours: action.data,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START:
      console.log("FETCH_REQUIRED_DOCTOR_INFO_STARTv");
      return {
        ...state,
        isAllDoctorInfo: true,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCESS:
      console.log("FETCH_REQUIRED_DOCTOR_INFO_SUCESS", action.data);
      return {
        ...state,
        isAllDoctorInfo: false,
        allDoctorInfo: action.data,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:
      console.log("FETCH_REQUIRED_DOCTOR_INFO_FAIL");
      return {
        ...state,
        isAllDoctorInfo: false,
      };
    default:
      return state;
  }
}

export default doctorReducer;
