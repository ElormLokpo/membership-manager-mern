import { persistReducer } from "redux-persist";
import { combineSlices } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const config = {
  key: "root",
  storage,
};

const reducers = combineSlices({});
export const persistedReducer = persistReducer(config, reducers);