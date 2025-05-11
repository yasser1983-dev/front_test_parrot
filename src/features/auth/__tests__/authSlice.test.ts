import reducer, { setUser, logout, finishLoading } from '../authSlice';
import { AuthState } from '../../../types/interfaces';

describe('authSlice', () => {
    const initialState: AuthState = {
        email: null,
        isLoading: true,
    };

    it('debería manejar setUser', () => {
        const nextState = reducer(initialState, setUser({ email: 'test@example.com' }));
        expect(nextState).toEqual({
            email: 'test@example.com',
            isLoading: false,
        });
    });

    it('debería manejar logout', () => {
        // Mock localStorage
        const removeItemMock = jest.fn();
        Object.defineProperty(window, 'localStorage', {
            value: {
                removeItem: removeItemMock,
            },
            writable: true,
        });

        const loggedInState: AuthState = {
            email: 'test@example.com',
            isLoading: false,
        };
        const nextState = reducer(loggedInState, logout());

        expect(nextState).toEqual({
            email: null,
            isLoading: false, // No cambia, se mantiene
        });

        expect(localStorage.removeItem).toHaveBeenCalledWith('email');
        expect(localStorage.removeItem).toHaveBeenCalledWith('orders');
    });

    it('debería manejar finishLoading', () => {
        const loadingState: AuthState = {
            email: null,
            isLoading: true,
        };
        const nextState = reducer(loadingState, finishLoading());
        expect(nextState).toEqual({
            email: null,
            isLoading: false,
        });
    });
});
