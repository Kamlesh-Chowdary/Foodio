import axiosInstance from "../helper/axiosInstance";

export class CustomerService {
  createCustomer = async ({
    firstName,
    lastName,
    address,
    phonenumber,
    message,
  }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.post(
        "/users/details",
        {
          firstName,
          lastName,
          address,
          phonenumber,
          message,
        },
        config
      );

      return response.data;
    } catch (error) {
      console.log(
        "Error while creating customer:: createCustomer",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
}

const customerService = new CustomerService();

export default customerService;