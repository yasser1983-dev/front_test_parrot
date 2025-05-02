import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderInterface} from "../../types/interfaces";

const initialState: OrderInterface[] = [];

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<OrderInterface>) => {
            state.push(action.payload);
        },
    },
});

export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;
