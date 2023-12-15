import actionTypes from "../actions/actionTypes";

const initialState = {
  allCodescheduleHours: [],
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
    default:
      return state;
  }
}

export default doctorReducer;
