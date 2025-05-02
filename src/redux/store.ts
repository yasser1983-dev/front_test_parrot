import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import reportReducer from "./slices/reportSlice";

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
