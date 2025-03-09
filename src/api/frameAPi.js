import api from '../config/axiosConfig';

export const getAllFrames = async () => {
    try {
        const response = await api.get('/frame/getAllFrames');
        return response.data;
    } catch (error) {
        console.error('Error fetching frames:', error);
        throw error;
    }
};