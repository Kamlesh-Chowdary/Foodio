import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "../services/menu.service";

const initialState = {
  menuItems: [],
  status: "idle",
  error: null,
};

export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async (selectedCategory) => {
    try {
      const response = await menuService.getMenu(selectedCategory);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menuItems = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
