import api from '../config/axiosConfig';

export const createUser = async (data) => {
    try {
        const response = await api.post('/user/createUser', data);
        console.log("user",response.data);
      return response.data;
    } catch (error) {
        console.error("Error creating user:", error.response?.data || error.message);
        throw error;
    }
};
