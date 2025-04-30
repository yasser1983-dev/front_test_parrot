// src/redux/slices/reportSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk
export const fetchDailyReport = createAsyncThunk(
    "report/fetchDailyReport",
    async (filters: { startDate: string; endDate: string }) => {
        const response = await axios.get("/api/sales-report", {
            params: {
                start_date: filters.startDate,
                end_date: filters.endDate,
            },
        });
        return response.data;
    }
);

interface ReportState {
    data: any[];
    loading: boolean;
    error: string | null;
}
const initialState: ReportState = {
    data: [],
    loading: false,
    error: null,
};

const reportSlice = createSlice({
    name: "report",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDailyReport.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchDailyReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching report";
            });
    },
});

export default reportSlice.reducer;
