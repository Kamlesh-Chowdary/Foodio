import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    cart: cartReducer,
  },
});

export default store;
