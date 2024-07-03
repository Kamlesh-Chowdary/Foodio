import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Reservation from "./pages/Reservation.jsx";
import Contact from "./pages/Contact.jsx";
import Order from "./pages/Order.jsx";
import Cart from "./pages/Cart.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import ConfirmReservation from "./pages/ConfirmReservation.jsx";
import CancelReservation from "./pages/CancelReservation.jsx";
import Login from "./pages/Login.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Reservation_Details from "./pages/Reservation_Details.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import SignUp from "./pages/Signup.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
        children: [
          {
            path: "details",
            element: (
              <AuthLayout shouldBeAuthenticated>
                <Reservation_Details />
              </AuthLayout>
            ),
          },
          {
            path: "confirm",
            element: (
              <AuthLayout shouldBeAuthenticated>
                <ConfirmReservation />
              </AuthLayout>
            ),
          },
          {
            path: "cancel/:reservationId",
            element: (
              <AuthLayout shouldBeAuthenticated>
                <CancelReservation />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/cart",
        element: <Cart />,
        children: [
          {
            path: "checkout",
            element: (
              <AuthLayout shouldBeAuthenticated>
                <CheckOut />
              </AuthLayout>
            ),
          },
          {
            path: "confirm",
            element: (
              <AuthLayout shouldBeAuthenticated>
                <ConfirmOrder />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: (
          <AuthLayout shouldBeAuthenticated={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout shouldBeAuthenticated={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
