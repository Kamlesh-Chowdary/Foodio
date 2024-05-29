import Logo from "../Logo";
import { NavLink } from "react-router-dom";
const index = () => {
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
  return (
    <header>
      <nav>
        <div>
          <Logo />
        </div>
        <div>
          <ul>
            {navItems.map((item) => {
              return (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div></div>
      </nav>
    </header>
  );
};

export default index;
