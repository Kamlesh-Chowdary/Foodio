import axiosInstance from "../helper/axiosInstance";
export class MenuService {
  getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    };
  };
  addDish = async ({ name, category, description, price, rating }) => {
    try {
      const config = this.getConfig();
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

  editDish = async (dishId, { name, category, description, price, rating }) => {
    try {
      const config = this.getConfig();
      const response = await axiosInstance.patch(
        `/menu/edit-dish/${dishId}`,
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
        "Error while editing the dish :: editDish",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  removeDish = async (dishId) => {
    try {
      const config = this.getConfig();
      const response = await axiosInstance.get(
        `/menu/remove-dish/${dishId}`,
        config
      );

      return response.data;
    } catch (error) {
      console.log(
        "Error while removing the dish :: removeDish",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  getMenu = async (category) => {
    try {
      const response = await axiosInstance.get("/menu/get-menu", {
        params: { category },
      });

      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching the dishes :: getMenu",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  getSingleDish = async (dishId) => {
    try {
      const response = await axiosInstance.get(`/menu/single-dish/${dishId}`);
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching the dish :: getSingleDish",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
}

const menuService = new MenuService();

export default menuService;
