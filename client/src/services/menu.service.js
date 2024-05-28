import axiosInstance from "../helper/axiosInstance";

export class MenuService {
  addDish = async ({ name, category, description, price, rating }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.post(
        "/menu/add-dish",
        {
          name,
          category,
          description,
          price,
          rating,
        },
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while adding dish to menu :: addDish",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
}

const menuService = new MenuService();

export default menuService;
