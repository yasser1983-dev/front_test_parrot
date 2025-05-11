import axios from 'axios';
import {injectable} from 'tsyringe';
import baseURL from '../config';
import {FormValuesOrder} from '../types/formValues';
import {BaseService} from "./BaseService";

@injectable()
export class SalesService extends BaseService {

    async getDishes(token: string) {
        const config = this.getAuthHeaders(token);
        const response = await axios.get(`${baseURL}/api/dishes/`, config);
        return response.data;
    }

    async sendOrders(token: string | null, data: FormValuesOrder) {
        const config = this.getAuthHeaders(token);

        const dataForm = {
            customer_name: data.customerName,
            items: [{ dish: data.itemId, quantity: data.quantity }],
        };

        const response = await axios.post(`${baseURL}/api/orders/`, dataForm, config);
        return response.data;
    }
}
