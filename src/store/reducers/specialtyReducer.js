import specialtyService from "../../services/specialtyService";
import actionTypes from "../actions/actionTypes";

const initialState = {
  listSpecialtys: [],
  isGetListSpecialtys: false,
  listClinics: [],
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
    case actionTypes.FETCH_GET_ALL_CLINIC_SUCCESS:
      return {
        ...state,
        listClinics: action.data,
      };
    case actionTypes.FETCH_GET_ALL_CLINIC_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default specialtyReducer;
