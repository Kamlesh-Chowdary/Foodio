import { Outlet, useLocation } from "react-router-dom";
import { Cart as CartComponent } from "../components";
const Cart = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/cart/checkout";
  const isConfirmPage = location.pathname === "/cart/confirm";
  const shouldRenderForm = !isCheckoutPage && !isConfirmPage;
  return (
    <div>
      {shouldRenderForm && <CartComponent />}
      <Outlet />
    </div>
  );
};

export default Cart;
