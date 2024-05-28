import axiosInstance from "../helper/axiosInstance";

export class OrderService {
  createOrder = async (customerId, { items, message, paymentMethod }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.post(
        "/order/create-order",
        {
          items,
          message,
          paymentMethod,
          customerId,
        },
        config
      );

      return response.data;
    } catch (error) {
      console.log(
        "Error while creating the order :: createOrder",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
  getAllOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.get("/order/all-orders", config);

      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching orders :: getAllOrders",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
}

const orderService = new OrderService();
export default orderService;
