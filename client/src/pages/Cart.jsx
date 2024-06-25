import { Outlet, useLocation } from "react-router-dom";
import { Cart as CartComponent } from "../components";
const Cart = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/cart/checkout";
  return (
    <div>
      {!isCheckoutPage && <CartComponent />}
      <Outlet />
    </div>
  );
};

export default Cart;
