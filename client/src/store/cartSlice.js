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
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart:( state, action )=>{
        const itemIndex = state.cartItems.findIndex(item=> item._id === action.payload._id);
        if(itemIndex>=0){
            if(state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity -= 1;
            }
            else{
                state.cartItems.splice(itemIndex, 1);
            }
        }
    }

  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
