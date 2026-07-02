import api from "./apiClient";
import qs from "qs";

const adminService = {
  UserCreate: async (email, is_active, is_superuser, username, password) => {
    try {
      const response = await api.post("/admin", {
        email: email,
        is_active: is_active,
        is_superuser: is_superuser,
        username: username,
        password: password,
      });
      return {
        sucess: true,
        data: response.data,
        message: "Registration successful",
      };
    } catch (error) {
      console.log(error.response?.data);
      return {
        sucess: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  },

  GetUsers: async () => {
    try {
      const response = await api.get("/admin");
      return {
        sucess: true,
        data: response.data,
        message: "Fecth SuccessFull",
      };
    } catch (error){
    return {
        sucess: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Cannot fetch data",
      }
    }
  },
};

export default adminService;
