import axios from "axios";
import baseURL from '../config';
import {injectable} from "tsyringe";
import {BaseService} from "./BaseService";

@injectable()
export class AuthServices extends BaseService{

    async loginUser (email: string): Promise<any> {
        try {
            const response = await axios.post(`${baseURL}/api/user/email-login/`, {email});
            return response.data;
        } catch (error) {
            console.error("Error en la autenticación:", error);
            throw error;
        }
    };

}


