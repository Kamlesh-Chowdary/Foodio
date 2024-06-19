import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItems: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { setMenuItems } = menuSlice.actions;

export default menuSlice.reducer;
