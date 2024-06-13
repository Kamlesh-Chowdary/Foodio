import React from "react";
import { Button } from "./index";
const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl col-span-1">
      <img src={`public/dishes/${item.name}.png`} alt={item.name} />
      <p className="text-3xl font-semibold text-center text-[#301E08] ">
        {item.name}
      </p>
      <p className="text-xl text-center text-[#301E08] ">{item.description}</p>
      <p className="text-3xl font-semibold text-[#301E08] ">₹{item.price}</p>
      <Button className=" font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl ">
        Order now
      </Button>
    </div>
  );
};

export default ItemCard;
