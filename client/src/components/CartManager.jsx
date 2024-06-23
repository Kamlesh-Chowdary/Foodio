/* eslint-disable react/prop-types */
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, reduceQuantity } from "../store/cartSlice";
const CartManager = ({ item }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentItem = cartItems.find((cartItem) => cartItem._id === item._id);

  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(addToCart(item));
  };
  const handleDecrement = () => {
    dispatch(reduceQuantity(item));
  };
  return (
    <section className="flex justify-evenly w-full bg-[#f9f9f9] p-2 items-center rounded-3xl">
      <div
        className="bg-white p-2 rounded-full shadow-sm shadow-slate-600 hover:cursor-pointer"
        onClick={handleDecrement}
      >
        <Minus color="red" />
      </div>
      <p className="text-xl text-[#301E08] ">
        {currentItem ? currentItem.quantity : 0}
      </p>
      <div
        className="bg-white p-2 rounded-full shadow-sm shadow-slate-600 hover:cursor-pointer"
        onClick={handleIncrement}
      >
        <Plus color="green" />
      </div>
    </section>
  );
};

export default CartManager;
