/* eslint-disable react/prop-types */
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, reduceQuantity } from "../store/cartSlice";
import { useState, useEffect } from "react";
const CartManager = ({ item }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentItem = cartItems.find((cartItem) => cartItem._id === item._id);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (addedToCart) {
      timer = setTimeout(() => {
        setAddedToCart(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [addedToCart]);
  const handleIncrement = () => {
    dispatch(addToCart(item));
    setAddedToCart(true);
  };
  const handleDecrement = () => {
    dispatch(reduceQuantity(item));
  };
  return (
    <section className="w-full">
      {addedToCart ? (
        <p className="bg-green-100 rounded-3xl p-2 text-center text-xl font-semibold text-[#301E08]">
          Added to cart
        </p>
      ) : (
        <div className="flex justify-evenly  bg-[#f9f9f9] p-2 items-center rounded-3xl">
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
        </div>
      )}
    </section>
  );
};

export default CartManager;
