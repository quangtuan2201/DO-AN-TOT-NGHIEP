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

  login: {},
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_KEYS_START:
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
      return {
        ...state,
        isLoadingGetAllUser: true,
      };
    case actionTypes.FETCH_GET_USER_SUCCESS:
      return {
        ...state,
        allUser: action.data,
        isLoadingGetAllUser: false,
      };
    case actionTypes.FETCH_GET_USER_FAIL:
      return {
        ...state,
        allUser: [],
        isLoadingGetAllUser: false,
      };
    case actionTypes.FETCH_DELETE_USER_SUCCESS:
      return {
        ...state,
        allUser: state.allUser.filter((user) => user.id !== action.userId),
      };
    case actionTypes.FETCH_UPDATE_USER_SUCCESS:
      const updatedUsers = state.allUser.map((user) => {
        return user.id === action.data.id ? action.data : user;
      });
      return {
        ...state,
        allUser: updatedUsers,
      };
    case actionTypes.FETCH_UPDATE_USER_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
