import {ReactNode} from "react";

export interface AuthState {
    email: string | null;
}

export interface ReportState {
    data: any[];
    loading: boolean;
    error: string | null;
}

export interface DishInterfaces {
    id: number;
    name: string;
    price: number;
}

export interface OrderInterface {
    customerName: string;
    itemName: string;
    quantity: number;
    totalCost: number;
}

export interface MainLayoutProps {
    children: ReactNode;
}