/* eslint-disable react/prop-types */
import { Button } from "./index";
const ItemCard = ({ item, CartManager }) => {
  return (
    <div className="bg-white rounded-3xl  lg:h-screen my-5 p-5 grid grid-rows-subgrid row-span-5">
      <section className=" flex justify-center items-center">
        <img
          src={`dishes/${item.name}.png`}
          alt={item.name}
          className="w-full"
        />
      </section>
      <p className="text-3xl font-semibold text-center text-[#301E08] py-5">
        {item.name}
      </p>
      <p className="text-xl text-center text-[#301E08] ">{item.description}</p>
      <p className="text-xl text-center text-[#301E08] py-5 md:py-0">
        {item.rating}
      </p>
      <section className="flex justify-between items-baseline ">
        <p className="text-3xl font-semibold text-[#301E08] ">₹{item.price}</p>
        {CartManager ? (
          <CartManager item={item} />
        ) : (
          <Button className=" font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl ">
            Order now
          </Button>
        )}
      </section>
    </div>
  );
};

export default ItemCard;
