import axiosInstance from "../helper/axiosInstance";

export class CustomerService {
  getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    };
  };
  createCustomer = async ({
    firstName,
    lastName,
    address,
    phonenumber,
    message,
  }) => {
    try {
      const config = this.getConfig();
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
  getCustomerDetails = async () => {
    try {
      const config = this.getConfig();
      const response = await axiosInstance.get("/users/get-details", config);
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching customer details :: getCustomerDetails",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
}

const customerService = new CustomerService();

export default customerService;
