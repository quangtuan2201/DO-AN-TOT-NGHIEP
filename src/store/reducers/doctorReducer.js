import actionTypes from "../actions/actionTypes";

const initialState = {
  allCodescheduleHours: [],
  allKeysMapDoctorInfo: [],
  isAllDoctorInfo: false,
  topDoctors: [],
  AllDoctors: [],
  saveInfoDoctor: {},
  detailDoctor: {},
};
function doctorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_GET_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        topDoctors: action.data,
      };
    case actionTypes.FETCH_GET_TOP_DOCTOR_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_GET_ALL_DOCTOR_SUCCESS:
      return {
        ...state,
        AllDoctors: action.data,
      };
    case actionTypes.FETCH_GET_ALL_DOCTOR_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_SAVE_INFO_DOCTOR_SUCCESS:
      return {
        ...state,
        saveInfoDoctor: action.data,
      };
    case actionTypes.FETCH_SAVE_INFO_DOCTOR_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_GET_DETAIL_DOCTOR_SUCCESS:
      return {
        ...state,
        detailDoctor: action.data,
      };
    case actionTypes.FETCH_GET_DETAIL_DOCTOR_FAIL:
      return {
        ...state,
      };

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
      return {
        ...state,
        isAllDoctorInfo: true,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCESS:
      return {
        ...state,
        isAllDoctorInfo: false,
        allKeysMapDoctorInfo: action.data,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:
      return {
        ...state,
        isAllDoctorInfo: false,
      };
    default:
      return state;
  }
}

export default doctorReducer;
