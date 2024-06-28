import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity < 10) {
          state.cartItems[itemIndex].quantity += 1;
        }
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    reduceQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id != action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
export const { addToCart, reduceQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
