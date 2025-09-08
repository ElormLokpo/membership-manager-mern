import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentEstablishmentId: null,
};

export const establishmentSlice = createSlice({
  name: "establishmentSlice",
  initialState,
  reducers: {
    storeCurrentEstablishmentId: (state, action) => {
      state.currentEstablishmentId = action.payload;
    },
  
  },
});

export const { storeCurrentEstablishmentId} = establishmentSlice.actions;
export default establishmentSlice.reducer;
