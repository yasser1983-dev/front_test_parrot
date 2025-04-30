import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000", // URL del backend
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = (email: string) => {
    return api.post("/login", { email });
};

export const createOrder = (order: any) => {
    return api.post("/orders", order);
};

