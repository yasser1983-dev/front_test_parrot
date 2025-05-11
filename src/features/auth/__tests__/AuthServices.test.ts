import axios from 'axios';
import { AuthServices } from '../AuthServices';
import baseURL from '../../../config';

// Mock de la dependencia axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthServices', () => {
    let authServices: AuthServices;

    beforeEach(() => {
        authServices = new AuthServices();
        // Limpia cualquier llamada mock anterior
        mockedAxios.post.mockClear();
    });

    it('should call the correct endpoint with the provided email on loginUser', async () => {
        const testEmail = 'test@example.com';
        const mockResponseData = { token: 'testToken' };
        mockedAxios.post.mockResolvedValue({ data: mockResponseData });

        await authServices.loginUser(testEmail);

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(mockedAxios.post).toHaveBeenCalledWith(`${baseURL}/api/user/email-login/`, { email: testEmail });
    });

    it('should return the data from a successful loginUser call', async () => {
        const testEmail = 'test@example.com';
        const mockResponseData = { token: 'testToken', userId: 123 };
        mockedAxios.post.mockResolvedValue({ data: mockResponseData });

        const result = await authServices.loginUser(testEmail);

        expect(result).toEqual(mockResponseData);
    });

    it('should throw an error if the loginUser call fails', async () => {
        const testEmail = 'test@example.com';
        const mockError = new Error('Request failed');
        mockedAxios.post.mockRejectedValue(mockError);

        await expect(authServices.loginUser(testEmail)).rejects.toThrow(mockError);
        expect(console.error).toHaveBeenCalledWith('Error en la autenticación:', mockError);
    });
});