import { useSelector } from "react-redux";
import { Container, CartCard, CartManager, Button } from "./index";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const totalPrices = cartItems.map((item) => item.quantity * item.price);
  const totalBill = totalPrices.reduce((acc, curr) => acc + curr, 0);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <section className="lg:w-5/6 mx-auto py-5">
        <div className=" flex items-center mb-10">
          <button
            onClick={goBack}
            className="bg-[#301E08] p-2 md:p-4 rounded-full "
          >
            <ArrowLeft size={30} color="white" />
          </button>
          <h1 className="text-5xl md:text-7xl text-center flex-grow  font-bold text-[#301E08] ">
            Order List
          </h1>
        </div>
        {cartItems.length > 0 ? (
          <section>
            <ul>
              {cartItems.map((item) => {
                return (
                  <li key={item.name}>
                    <CartCard item={item} CartManger={CartManager} />
                  </li>
                );
              })}
            </ul>
            <p className="text-2xl text-[#301e08ae]   text-end pr-2">Total</p>
            <p className="text-4xl text-[#301E08] font-bold text-end pr-2">
              ₹{totalBill}.00
            </p>
            <div className="flex justify-end gap-3 px-1 py-5">
              <Button
                className="font-semibold px-10 py-5  rounded-2xl text-lg"
                onClick={() => navigate("/order")}
              >
                Continue Order
              </Button>
              <Button className="font-semibold px-10 py-5 rounded-2xl text-lg">
                Checkout
              </Button>
            </div>
          </section>
        ) : (
          <p className="text-3xl text-[#301E08] pb-10 text-center">
            Cart is Empty. <br className="md:hidden" /> Why not
            <Button
              className="font-semibold px-10 my-5 mx-3 py-5 rounded-2xl text-2xl"
              onClick={() => navigate("/order")}
            >
              Order now?
            </Button>
          </p>
        )}
      </section>
    </Container>
  );
};

export default Cart;
