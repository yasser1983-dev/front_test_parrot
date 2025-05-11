import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ReportState} from "../../types/interfaces";
import {ReportService} from "./ReportServices";
import {container} from "tsyringe";

// Async thunk
export const fetchDailyReport = createAsyncThunk(
    "report/fetchDailyReport",
    async ({startDate, endDate}: { startDate: string; endDate: string }) => {
        const token = localStorage.getItem('token');
        const service = container.resolve(ReportService);
        return await service.getDailyReport(startDate, endDate, token);
    }
);

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
                state.error = action.error.message || "Error obteniendo datos de rerporte";
            });
    },
});

export default reportSlice.reducer;
