import "reflect-metadata";
import { ReportService } from "../ReportServices";
import MockAdapter from "axios-mock-adapter";
import axios, { AxiosError } from "axios";
import baseURL from "../../../config";

jest.mock("../../../shared/BaseService"); // Mockear BaseService si tiene lógica adicional

describe("ReportService", () => {
    const mock = new MockAdapter(axios);
    const reportService = new ReportService();
    const token = "testToken";
    const startDate = "2024-01-01";
    const endDate = "2024-01-31";

    afterEach(() => {
        mock.reset();
    });

    it("debería retornar el reporte diario cuando la petición es exitosa", async () => {
        const mockResponse = { total_sales: 1000, orders: 25 };

        mock.onGet(`${baseURL}/api/reports/`, {
            params: {
                start_date: startDate,
                end_date: endDate,
            }
        }).reply(200, mockResponse);

        const result = await reportService.getDailyReport(startDate, endDate, token);
        expect(result).toEqual(mockResponse);
    });

    it("debería lanzar un error si no se proporciona el token", async () => {
        await expect(
            reportService.getDailyReport(startDate, endDate, null)
        ).rejects.toThrow("Token de autenticación no proporcionado.");
    });

    it("debería lanzar un error si la API responde con error", async () => {
        const errorResponse = { error: "Internal Server Error" };

        mock.onGet(`${baseURL}/api/reports/`, {
            params: {
                start_date: startDate,
                end_date: endDate,
            }
        }).reply(500, errorResponse);

        try {
            await reportService.getDailyReport(startDate, endDate, token);
        } catch (error) {
            const axiosError = error as AxiosError;
            expect(axiosError.response?.data).toEqual(errorResponse);
        }
    });
});
