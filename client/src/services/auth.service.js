import axiosInstance from "../helper/axiosInstance";

export class AuthService {
  createAccount = async ({ fullname, email, password }) => {
    try {
      const response = await axiosInstance.post("users/register", {
        fullname,
        email,
        password,
      });
      if (response) {
        return this.loginUser({ email, password });
      }
      return response.data;
    } catch (error) {
      console.log(
        "Error while creating account :",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post(`users/login`, {
        email,
        password,
      });
      window.sessionStorage.setItem("Token", response.data.data.token);
      return response.data;
    } catch (error) {
      console.log("Error while logging in:", error.response.data.message);
      throw error.response.data;
    }
  };
}

const authService = new AuthService();

export default authService;
