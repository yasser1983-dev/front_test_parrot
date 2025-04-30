import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Order} from "../../interface/order";

const initialState: Order[] = [];

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.push(action.payload);
        },
    },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
