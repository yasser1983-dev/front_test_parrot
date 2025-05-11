import "reflect-metadata";
import {SalesService} from '../SalesServices';
import MockAdapter from 'axios-mock-adapter';
import axios, {AxiosError} from 'axios';
import baseURL from '../../../config';
import {FormValuesOrder} from '../../../types/formValues';

jest.mock('../../../shared/BaseService'); // Mockear cualquier dependencia que venga de BaseService

describe('SalesService', () => {
    const mock = new MockAdapter(axios);
    const salesService = new SalesService();
    const token = 'testToken';

    afterEach(() => {
        mock.reset();
    });

    // Test para getDishes
    it('debería retornar los platos disponibles cuando la petición sea exitosa', async () => {
        const mockDishesResponse = [{ id: 1, name: 'Dish 1' }, { id: 2, name: 'Dish 2' }];

        // Configurar el mock de axios para la respuesta de GET
        mock.onGet(`${baseURL}/api/dishes/`).reply(200, mockDishesResponse);

        const result = await salesService.getDishes(token);

        // Verificar que el resultado de la respuesta es el esperado
        expect(result).toEqual(mockDishesResponse);
    });

    // Test para sendOrders
    it('debería enviar la orden correctamente cuando la petición sea exitosa', async () => {
        const mockOrderResponse = { success: true, orderId: '12345' };
        const orderData: FormValuesOrder = {
            customerName: 'John Doe',
            itemId: 1,
            quantity: 2
        };

        // Configurar el mock de axios para la respuesta de POST
        mock.onPost(`${baseURL}/api/orders/`).reply(200, mockOrderResponse);

        const result = await salesService.sendOrders(token, orderData);

        // Verificar que el resultado de la respuesta es el esperado
        expect(result).toEqual(mockOrderResponse);
    });

    // Test para sendOrders cuando el token es null
    it('debería manejar el caso en que el token es null', async () => {
        const mockErrorResponse = { error: 'Unauthorized' };
        const orderData: FormValuesOrder = {
            customerName: 'Jane Doe',
            itemId: 2,
            quantity: 3
        };

        // Configurar el mock de axios para la respuesta de POST con error (token null)
        mock.onPost(`${baseURL}/api/orders/`).reply(401, mockErrorResponse);

        try {
            await salesService.sendOrders(null, orderData);
        } catch (error) {
            const axiosError = error as AxiosError; // Type assertion

            // Verificar que se ha lanzado el error esperado
            expect(axiosError.response?.data).toEqual(mockErrorResponse);
        }
    });
});
