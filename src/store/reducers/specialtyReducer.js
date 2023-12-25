import specialtyService from "../../services/specialtyService";
import actionTypes from "../actions/actionTypes";

const initialState = {
  listSpecialtys: [],
  isGetListSpecialtys: false,
};

const specialtyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GET_ALL_SPECIALTY_START:
      return {
        ...state,
        isLoggeisGetListSpecialtydIn: true,
      };
    case actionTypes.FETCH_GET_ALL_SPECIALTY_SUCCESS:
      return {
        ...state,
        listSpecialtys: action.data,
        isLoggeisGetListSpecialtydIns: false,
      };
    case actionTypes.FETCH_GET_ALL_SPECIALTY_FAIL:
      return {
        ...state,
        isLoggeisGetListSpecialtydIn: false,
      };
    default:
      return state;
  }
};

export default specialtyReducer;
