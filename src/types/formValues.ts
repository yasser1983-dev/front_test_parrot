export type FormValuesLogin = {
    email: string;
};

export type FormValuesOrder = {
    customerName: string;
    itemId: number | null;
    quantity: number;
};

export type FormValuesReport = {
    startDate: Date;
    endDate: Date;
};