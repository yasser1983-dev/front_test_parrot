import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderForm from '../components/OrderForm';
import {useOrderDispatch} from '../hooks/useOrderDispatch';
import {useLoadDishes} from '../hooks/useLoadDishes';
import {SalesService} from '../SalesServices';

// Mocks
jest.mock('../hooks/useOrderDispatch');
jest.mock('../hooks/useLoadDishes');
jest.mock('../SalesServices');

const mockSendOrders = jest.fn();
const mockRegisterInState = jest.fn();
const mockSetDish = jest.fn();
const mockDishTotalCost = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();

    // Mock de useLoadDishes
    (useLoadDishes as jest.Mock).mockReturnValue({
        itemOptions: [{ label: 'Pizza', value: 1 }],
        dishes: [],
    });

    // Mock de useOrderDispatch
    (useOrderDispatch as jest.Mock).mockReturnValue({
        token: 'fake-token',
        itemName: 'Pizza',
        totalCost: 20,
        setDish: mockSetDish,
        dishTotalCost: mockDishTotalCost,
        registerInState: mockRegisterInState,
    });

    // Mock del servicio
    (SalesService as jest.Mock).mockImplementation(() => ({
        sendOrders: mockSendOrders,
    }));
});

describe('OrderForm', () => {
    it('renderiza correctamente los campos y el botón', () => {
        render(<OrderForm />);

        expect(screen.getByLabelText(/nombre del comensal/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nombre del artículo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cantidad/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/costo total/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /agregar orden/i})).toBeInTheDocument();
    });

    it('muestra errores si los campos obligatorios están vacíos', async () => {
        render(<OrderForm />);

        const submitButton = screen.getByRole('button', { name: /agregar orden/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/este campo es obligatorio/i)).toBeInTheDocument();
        });
    });

    it('llama a la función onSubmit con datos válidos', async () => {
        render(<OrderForm />);

        const customerNameInput = screen.getByLabelText(/nombre del comensal/i);
        const itemDropdown = screen.getByLabelText(/nombre del artículo/i);
        const quantityInput = screen.getByLabelText(/cantidad/i);
        const submitButton = screen.getByRole('button', { name: /agregar orden/i });

        await userEvent.type(customerNameInput, 'John Doe');
        await userEvent.selectOptions(itemDropdown, ['1']);
        await userEvent.type(quantityInput, '2');

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSendOrders).toHaveBeenCalledWith(
                'fake-token',
                expect.objectContaining({
                    customerName: 'John Doe',
                    itemId: 1,
                    quantity: 2,
                })
            );
            expect(mockRegisterInState).toHaveBeenCalled();
        });
    });

    it('actualiza el costo total cuando cambia la cantidad', async () => {
        render(<OrderForm />);

        const quantityInput = screen.getByLabelText(/cantidad/i);

        // Simula un cambio en la cantidad
        await userEvent.type(quantityInput, '3');

        expect(mockDishTotalCost).toHaveBeenCalledWith(3);
    });
});
