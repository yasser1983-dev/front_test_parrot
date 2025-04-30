import axios from "axios";
import baseURL from '../config';

export const get_dishes = async (token: string) => {
    try {
        const headers = {
            headers: {
                Authorization: `Token ${token}`,
            },
        };
        const response = await axios.get(`${baseURL}/api/dishes/`,headers);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        throw error;
    }
};