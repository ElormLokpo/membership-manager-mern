import { createSlice } from "@reduxjs/toolkit";

export interface IAuthUser {
  id: string | null;
  fullname: string | null;
  email: string | null;
  token: string | null;
  membership: string | null;
  roles: string[] | null;
}

interface IInitialState {
  auth_user: IAuthUser | null;
}

const initialState: IInitialState = {
  auth_user: {
    id: null,
    fullname: null,
    email: null,
    token: null,
    membership: null,
    roles: [],
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    storeAuthUser: (state, action) => {
      state.auth_user = action.payload;
    },
    clearAuthUser: (state) => {
      state.auth_user = null;
    },
  },
});

export const { storeAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
