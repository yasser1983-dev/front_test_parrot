import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';
import { useLogin } from '../hooks/useLogin';

jest.mock('../hooks/useLogin');

describe('Login Component', () => {
    const mockHandleLogin = jest.fn();

    beforeEach(() => {
        (useLogin as jest.Mock).mockReturnValue({
            loading: false,
            error: null,
            handleLogin: mockHandleLogin,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza correctamente', () => {
        render(<Login />);
        expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('muestra error si el correo está vacío', async () => {
        render(<Login />);
        const button = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
        });
    });

    it('llama a handleLogin con un email válido', async () => {
        render(<Login />);
        const input = screen.getByLabelText(/correo electrónico/i);
        const button = screen.getByRole('button', { name: /iniciar sesión/i });

        await userEvent.type(input, 'test@example.com');
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockHandleLogin).toHaveBeenCalledWith('test@example.com');
        });
    });
});
