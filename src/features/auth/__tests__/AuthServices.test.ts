import "reflect-metadata";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthServices } from '../AuthServices';
import baseURL from '../../../config';

describe('AuthServices', () => {
    const mock = new MockAdapter(axios);
    const authService = new AuthServices();

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
    });

    it('debería retornar datos cuando el login es exitoso', async () => {
        const email = 'test@example.com';
        const mockResponse = { token: 'abc123' };

        mock.onPost(`${baseURL}/api/user/email-login/`, { email }).reply(200, mockResponse);

        const result = await authService.loginUser(email);

        expect(result).toEqual(mockResponse);
    });

    it('debería lanzar un error si el login falla', async () => {
        const email = 'test@example.com';

        mock.onPost('/api/user/email-login/', { email }).reply(404);

        await expect(authService.loginUser(email)).rejects.toThrow();
    });
});
