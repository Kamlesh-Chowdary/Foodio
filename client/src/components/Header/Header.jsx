/* eslint-disable react-hooks/rules-of-hooks */

import { NavLink, useNavigate } from "react-router-dom";
import { Container, Logo, Button } from "../index";
import { useState } from "react";
import { X, Menu, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../services/auth.service";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [display, setDisplay] = useState("hidden");
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navItems = [
    {
      name: "Home",
      path: "",
    },
    {
      name: "Menu",
      path: "menu",
    },
    {
      name: "About us",
      path: "about",
    },
    {
      name: "Order online",
      path: "order",
    },
    {
      name: "Reservation",
      path: "reservation",
    },
    {
      name: "Contact us",
      path: "contact",
    },
  ];

  const handleLogout = async () => {
    try {
      const isLogout = await authService.logoutUser();
      if (isLogout) dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);

    if (!isNavbarVisible) setDisplay("block");
    else setDisplay("hidden");
  };
  return (
    <header className="pt-5 md:pt-0">
      <Container>
        <nav className="md:flex md:justify-evenly md:w-full   bg-blur items-center  md:mx-auto md:my-7">
          <div className="flex justify-between  items-center mb-4 md:mb-0 ">
            <NavLink to="" key="logo">
              <Logo />
            </NavLink>
            <div className="md:hidden flex gap-8 relative">
              <button className="md:hidden" onClick={() => navigate("/cart")}>
                {cartItems.length > 0 && (
                  <span className="text-xs font-semibold flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full absolute  left-4 -top-1">
                    {cartItems.length}
                  </span>
                )}
                <ShoppingCart size={28} />
              </button>
              <button onClick={toggleNavbar}>
                {isNavbarVisible ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          <div className={`${display} md:flex `}>
            <ul className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {navItems.map((item) => {
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-primary border-b-2  border-primary"
                          : "text-black "
                      }`
                    }
                  >
                    <li>{item.name}</li>
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div
            className={`${display} md:flex  mt-4 flex md:mt-0  gap-4 justify-center items-center`}
          >
            <button
              className="hidden md:block relative"
              onClick={() => navigate("/cart")}
            >
              {cartItems.length > 0 && (
                <span className="text-xs font-semibold flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full absolute  left-4 -top-1">
                  {cartItems.length}
                </span>
              )}
              <ShoppingCart size={30} />
            </button>
            {status ? (
              <Button
                className="bg-primary text-white font-semibold rounded-3xl py-3 px-7"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="bg-primary text-white font-semibold rounded-3xl py-3 px-7"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
