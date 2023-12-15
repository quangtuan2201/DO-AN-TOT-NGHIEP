import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  // isLoadingGender: false,
  roles: [],
  positions: [],
  isLoadingKeys: false,
  isLoadingCreateUser: false,
  users: {},
  allUser: [],
  topDoctors: [],
  allDoctors: [],
  saveInfoDoctor: {},
  detailDoctor: {},
  login: {},
};
const adminReducer = (state = initialState, action) => {
  // console.log("action:", action);
  switch (action.type) {
    case actionTypes.FETCH_USER_LOGIN_SUCCESS:
    //   console.log("FETCH_USER_LOGIN_SUCCESS", action.data);
    //   return {
    //     ...state,
    //     login: action.data,
    //   };
    // case actionTypes.FETCH_LOGIN_USER_FAIL:
    //   return {
    //     ...state,
    //   };
    case actionTypes.FETCH_KEYS_START:
      // console.log("FETCH_KEYS_START", action);
      return {
        ...state,
        isLoadingKeys: true,
      };
    case actionTypes.FETCH_KEYS_SUCCESS:
      return {
        ...state,
        gender: action.data.GENDER,
        positions: action.data.POSITION,
        roles: action.data.ROLE,
        isLoadingKeys: false,
        isLoadingGetAllUser: false,
      };
    case actionTypes.FETCH_KEYS_FAIL:
      // console.log("FETCH_KEYS_FAIL", action);
      return {
        ...state,
        gender: [],
        positions: [],
        roles: [],
        isLoadingKeys: false,
      };
    case actionTypes.FETCH_CREATE_USER_START:
      return {
        ...state,
        isLoadingCreateUser: true,
      };
    case actionTypes.FETCH_CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoadingCreateUser: false,
        users: action.data,
        allUser: [...state.allUser, action.data],
      };
    case actionTypes.FETCH_CREATE_USER_FAIL:
      return {
        ...state,
        isLoadingCreateUser: false,
      };
    case actionTypes.FETCH_GET_USER_START:
      console.log("FETCH_GET_USER_START");
      return {
        ...state,
        isLoadingGetAllUser: true,
      };
    case actionTypes.FETCH_GET_USER_SUCCESS:
      console.log("FETCH_GET_USER_SUCCESS");
      return {
        ...state,
        allUser: action.data,
        isLoadingGetAllUser: false,
      };
    case actionTypes.FETCH_GET_USER_FAIL:
      console.log("FETCH_GET_USER_FAIL");
      return {
        ...state,
        allUser: [],
        isLoadingGetAllUser: false,
      };
    case actionTypes.FETCH_DELETE_USER_SUCCESS:
      console.log("FETCH_DELETE_USER_SUCCESS");
      return {
        ...state,
        allUser: state.allUser.filter((user) => user.id != action.userId),
      };
    case actionTypes.FETCH_UPDATE_USER_SUCCESS:
      console.log("FETCH_PUT_USER_SUCCESS");
      const updatedUsers = state.allUser.map((user) => {
        return user.id === action.data.id ? action.data : user;
      });
      console.log("FETCH_PUT_USER_SUCCESS updatedUsers: ", updatedUsers);
      return {
        ...state,
        allUser: updatedUsers,
      };
    case actionTypes.FETCH_UPDATE_USER_FAIL:
      return {
        ...state,
      };
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
      console.log("FETCH_GET_ALL_DOCTOR_SUCCESS");
      return {
        ...state,
        allDoctors: action.data,
      };
    case actionTypes.FETCH_GET_ALL_DOCTOR_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_SAVE_INFO_DOCTOR_SUCCESS:
      console.log("REDUCER data : ", action.data);
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
    default:
      return state;
  }
};

export default adminReducer;
