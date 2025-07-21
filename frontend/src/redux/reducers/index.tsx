import { persistReducer } from "redux-persist";
import { combineSlices } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";

const config = {
  key: "root",
  storage,
};

const reducers = combineSlices({
  authReducer,
});
export const persistedReducer = persistReducer(config, reducers);
