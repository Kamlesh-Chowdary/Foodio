import { useSelector } from "react-redux";
import { Container, CartCard, CartManager, Button } from "./index";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <section className="lg:w-5/6 mx-auto">
        <button
          onClick={goBack}
          className="bg-[#301E08] p-3 md:p-5 rounded-full absolute"
        >
          <ArrowLeft size={30} color="white" />
        </button>
        <h1 className="text-5xl md:text-7xl text-center  font-bold text-[#301E08] mt-5 mb-10">
          Order List
        </h1>
        {cartItems.length > 0 ? (
          <section>
            {cartItems.map((item) => {
              return (
                <CartCard
                  key={item.name}
                  item={item}
                  CartManger={CartManager}
                />
              );
            })}
          </section>
        ) : (
          <p className="text-3xl text-[#301E08] pb-10 text-center">
            Cart is Empty. <br className="md:hidden" /> Why not
            <Button className="font-semibold px-10 my-5 mx-3 py-5 rounded-2xl text-2xl">
              Order now?
            </Button>
          </p>
        )}
      </section>
    </Container>
  );
};

export default Cart;
