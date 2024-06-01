/* eslint-disable react-hooks/rules-of-hooks */

import { NavLink } from "react-router-dom";
import { Container, Logo } from "../index";
import { useState } from "react";
import { X, Menu, ShoppingCart } from "lucide-react";

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [display, setDisplay] = useState("hidden");
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

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    console.log(isNavbarVisible);
    if (!isNavbarVisible) setDisplay("block");
    else setDisplay("hidden");
  };
  return (
    <header className="pt-5 md:pt-0">
      <Container>
        <nav className="md:flex md:justify-evenly md:w-full   items-center  md:mx-auto md:my-7">
          <div className="flex justify-between  items-center mb-4 md:mb-0 ">
            <Logo />
            <div className="md:hidden">
              <button onClick={toggleNavbar}>
                {isNavbarVisible ? <X /> : <Menu />}
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
            <button className="rounded-full p-3 bg-white">
              <ShoppingCart />
            </button>
            <button className="bg-primary text-white font-semibold rounded-3xl py-3 px-7">
              Login
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
