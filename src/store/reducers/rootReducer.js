import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import doctorReducer from "./doctorReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const adminPersistConfig = {
  ...persistCommonConfig,
  key: "admin",
  whitelist: ["isLoggedIn", "userInfo"],
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};
const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};
const doctorPersistConfig = {
  ...persistCommonConfig,
  key: "doctors",
  // whitelist: [],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    admin: persistReducer(adminPersistConfig, adminReducer),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    doctor: persistReducer(doctorPersistConfig, doctorReducer),
    // admin: adminReducer,/
  });
