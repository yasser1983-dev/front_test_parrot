import axios from "axios";
import baseURL from '../config';

export const loginUser = async (email: string) => {
    try {
        const response = await axios.post(`${baseURL}/api/user/email-login/`, {email});
        return response.data;
    } catch (error) {
        console.error("Error en la autenticación:", error);
        throw error;
    }
};
