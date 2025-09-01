import type { IAuthResponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthResponse = {
  token: null,
  user: {
    id: null,
    fullname: null,
    email: null,
    role: null,
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    storeAuthUser: (state, action) => {
      state.user = action.payload;
    },
    storeToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { storeAuthUser, storeToken, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
