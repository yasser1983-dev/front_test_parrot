import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderInterface} from "../../types/interfaces";

const initialState: OrderInterface[] = [];

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<OrderInterface[]>) => {
            const arrayOrders = action.payload;
            arrayOrders.forEach((item: OrderInterface) => {
                state.push(item);
            });
        },
        deleteOrder: (state) => {
            state.length = 0;
        },
    },
});

export const {addOrder, deleteOrder} = orderSlice.actions;
export default orderSlice.reducer;
