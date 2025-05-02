import axios from "axios";
import baseURL from '../config';
import {FormValuesOrder} from "../types/formValues";

export const get_dishes = async (token: string) => {
    try {
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        };
        const response = await axios.get(`${baseURL}/api/dishes/`, headers);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        throw error;
    }
};

export const send_orders = async (token: string | null, data: FormValuesOrder): Promise<any> => {
    try {
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        };
        const dataForm = {
            customer_name: data.customerName,
            items: [
                {
                    dish: data.itemId,
                    quantity: data.quantity,
                }]
        }
        const response = await axios.post(`${baseURL}/api/orders/`, dataForm, headers);
        return response.data;

    } catch (error) {
        throw error;
    }
}
