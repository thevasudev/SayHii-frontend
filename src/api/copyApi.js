import api from '../config/axiosConfig';

export const getAllCopies = async () => {
    try {
        const response = await api.get('/copy/getAllCopys');
        return response.data;
    } catch (error) {
        console.error('Error fetching copies:', error);
        throw error;
    }
};