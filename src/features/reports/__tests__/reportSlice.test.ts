import "reflect-metadata";
import reducer, { fetchDailyReport } from '../reportSlice';
import { ReportState } from '../../../types/interfaces';

describe('reportSlice', () => {
    const initialState: ReportState = {
        data: [],
        loading: false,
        error: null,
    };

    it('debería manejar fetchDailyReport.pending', () => {
        const action = { type: fetchDailyReport.pending.type };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            data: [],
            loading: true,
            error: null,
        });
    });

    it('debería manejar fetchDailyReport.fulfilled', () => {
        const mockData = [{ date: '2024-01-01', total: 100 }];
        const action = {
            type: fetchDailyReport.fulfilled.type,
            payload: mockData,
        };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            data: mockData,
            loading: false,
            error: null,
        });
    });

    it('debería manejar fetchDailyReport.rejected', () => {
        const action = {
            type: fetchDailyReport.rejected.type,
            error: { message: 'Error al obtener datos' },
        };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            data: [],
            loading: false,
            error: 'Error al obtener datos',
        });
    });
});
