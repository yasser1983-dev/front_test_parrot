import axios from "axios";
import baseURL from '../config';

export const getDailyReport = async (
    startDate: string,
    endDate: string,
    token: string | null,
): Promise<any> => {
    if (!token) {
        throw new Error("Token de autenticación no proporcionado.");
    }

    const config = {
        params: {
            start_date: startDate,
            end_date: endDate,
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    const response = await axios.get(`${baseURL}/api/reports/`, config);
    return response.data;
};
