import axios from "axios";
import baseURL from "../config";
import {injectable} from "tsyringe";
import {BaseService} from "./BaseService";

@injectable()
export class ReportService extends BaseService {
    async getDailyReport(
        startDate: string,
        endDate: string,
        token: string | null
    ): Promise<any> {
        if (!token) {
            throw new Error("Token de autenticación no proporcionado.");
        }

        const config = this.getAuthHeaders(token)
        const allConfig = {
            ...config,
            params: {
                start_date: startDate,
                end_date: endDate,
            }
        }

        const response = await axios.get(`${baseURL}/api/reports/`, allConfig);
        return response.data;
    }
}
