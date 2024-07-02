import axiosInstance from "../helper/axiosInstance";
export class AuthService {
  getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    };
  };
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
      throw error.response.data.message;
    }
  };

  logoutUser = async () => {
    try {
      const config = this.getConfig();
      await axiosInstance.get(`users/logout`, config);
      window.sessionStorage.setItem("Token", "");
    } catch (error) {
      console.log("Error while loggin out:", error.response.data.message);
      throw error.response.data.message;
    }
  };

  currentUser = async () => {
    try {
      const config = this.getConfig();
      const response = await axiosInstance.get(`/users/current-user`, config);
      return response.data.data;
    } catch (error) {
      console.log(
        "Error while fetching current user details:",
        error.response.data.message
      );
    }
  };
}
const authService = new AuthService();

export default authService;
