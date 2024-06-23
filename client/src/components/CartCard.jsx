/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
const CartCard = ({ item, CartManger }) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };
  return (
    <>
      <div className="bg-white   rounded-3xl  mx-auto p-2 my-4">
        <div className="flex  items-center justify-between mb-4">
          <img
            src={`dishes/${item.name}.png`}
            alt={item.name}
            className="w-32"
          />
          <p className="md:text-3xl text-xl w-full mx-3 text-[#301E08]  md:w-1/4 ">
            {item.name}
          </p>
          <div className="w-1/5 hidden md:block">
            <CartManger item={item} />
          </div>
          <p className="text-xl font-semibold text-[#301E08] w-1/5 hidden md:block">
            ₹{item.price}
            <br />
            <span className="font-normal text-lg">
              Total = {item.quantity * item.price}
            </span>
          </p>
          <div className="hover:cursor-pointer" onClick={handleRemove}>
            <Trash2 color="red" size={28} />
          </div>
        </div>
        <div className="md:hidden flex justify-between">
          <div className="w-1/2">
            <CartManger item={item} />
          </div>
          <p className="text-xl font-semibold text-[#301E08]">
            ₹{item.price}
            <br />
            <span className="font-normal text-lg">
              Total = {item.quantity * item.price}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartCard;
