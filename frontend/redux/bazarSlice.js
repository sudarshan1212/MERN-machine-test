import { createSlice } from "@reduxjs/toolkit";
const initialState = { userInfo: null, noteList: [] };
export const bazarSlice = createSlice({
  name: "bazar",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    removeUsers: (state, action) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});
export const { addUsers, removeUsers } = bazarSlice.actions;
export default bazarSlice.reducer;
