import { persistReducer } from "redux-persist";
import { combineSlices } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import establishmentReducer from "./establishmentReducer";

const config = {
  key: "root",
  storage,
};

const reducers = combineSlices({
  authReducer,
  establishmentReducer,
});

export const persistedReducer = persistReducer(config, reducers);
