import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login';

jest.mock('../../hooks/useLogin', () => ({
    useLogin: () => ({
        loading: false,
        error: null,
        handleLogin: jest.fn(),
    }),
}));

describe('Login básico', () => {
    it('muestra input de email y botón', () => {
        render(<Login />);
        expect(screen.getByPlaceholderText(/Ingresa tu email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
    });
});
