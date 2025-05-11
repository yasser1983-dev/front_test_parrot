import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/orderSlice";
import reportReducer from "../features/reports/reportSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        report: reportReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
