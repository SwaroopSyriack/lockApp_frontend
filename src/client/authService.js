import api from "./apiClient";

const authService = {
  Login: async (formData) => {
    try {
      const response = await api.post('/login', formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }

      return {
        success: true,
        data: response.data,
        message: 'Login successful',
      };

    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  },
};

export default authService