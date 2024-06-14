import React, { useEffect, useState } from "react";
import { Container, Button, ItemCard } from "./index";
import menuService from "../services/menu.service";
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await menuService.getMenu();
        setMenuItems(response.data);
      } catch (error) {
        console.log("Error While fetching menu items", error);
      }
    };
    fetchMenuItems();
  }, []);
  return (
    <Container>
      <section className="lg:w-5/6 py-5 m-auto ">
        <h1 className="text-4xl md:text-7xl font-bold text-center text-[#301E08] ">
          Our Popular Menu
        </h1>
        <div className="md:grid md:gri-cols-2 lg:grid-cols-3 ">
          {menuItems.map((item) => (
            <ItemCard item={item} key={item.name} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Menu;
