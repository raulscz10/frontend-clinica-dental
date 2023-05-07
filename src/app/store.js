import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
//import otherReducer from "../features/otherReducer/Reducer";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth","other"],
};

const authPersistConfig = {
  key: "auth",
  storage: sessionStorage,
};

// const otherPersistConfig = {
//   key: "other",
//   storage: sessionStorage,
// };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  //other: persistReducer(otherPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export const persistor = persistStore(store);