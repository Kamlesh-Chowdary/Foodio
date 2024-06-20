import { useEffect, useState } from "react";
import { Container, ItemCard, PaginationGrid } from "../components/index";

import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "../store/menuSlice";
const Menu = () => {
  const { menuItems, status } = useSelector((state) => state.menu);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const categories = [
    "All Category",
    "Pizza",
    "Burger",
    "Dessert",
    "Curry",
    "Naan",
  ];
  const dispatch = useDispatch();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMenuItems(selectedCategory));
  }, [selectedCategory, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading items.</div>;
  }

  const handleCategoryClick = (e) => {
    setCurrentPage(1);
    setSelectedCategory(e.target.textContent);
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(menuItems.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItem =
    menuItems && menuItems.slice(firstItemIndex, lastItemIndex);

  return (
    <Container>
      <section className="lg:w-5/6 py-5 m-auto ">
        <h1 className="text-4xl md:text-7xl font-bold text-center text-[#301E08] ">
          Our Popular Menu
        </h1>
        <section>
          <ul className="flex justify-between gap-5 no-scrollbar mt-10 mb-5 overflow-auto">
            {categories.map((item) => (
              <li
                className={`px-10 py-5 text-[#301E08] hover:cursor-pointer rounded-2xl text-nowrap text-xl font-semibold
                  ${
                    item === selectedCategory
                      ? "bg-primary text-white"
                      : "bg-white"
                  } 
                  `}
                key={item}
                onClick={handleCategoryClick}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentItem &&
            currentItem.map((item) => <ItemCard item={item} key={item.name} />)}
        </div>
        <PaginationGrid
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
        />
      </section>
    </Container>
  );
};

export default Menu;
