export abstract class BaseService {
    protected getAuthHeaders(token: string | null) {
        if (!token) {
            throw new Error("Token de autenticación no proporcionado.");
        }

        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        };
    }
}
