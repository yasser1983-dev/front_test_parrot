import orderReducer, { addOrder, deleteOrder } from '../orderSlice';
import { OrderInterface } from '../../../types/interfaces';

describe('orderSlice', () => {
    const mockOrder: OrderInterface = {
        customerName: 'Pepe',
        itemName: 'Pizza',
        quantity: 2,
        totalCost: 10.99,
    };

    const anotherOrder: OrderInterface = {
        customerName: 'jose',
        itemName: 'Burger',
        quantity: 1,
        totalCost: 8.5,
    };

    it('debería manejar addOrder', () => {
        const initialState: OrderInterface[] = [];

        const action = addOrder([mockOrder, anotherOrder]);
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual([mockOrder, anotherOrder]);
    });

    it('debería manejar deleteOrder', () => {
        const currentState: OrderInterface[] = [mockOrder, anotherOrder];

        const action = deleteOrder();
        const newState = orderReducer(currentState, action);

        expect(newState).toEqual([]);
    });
});