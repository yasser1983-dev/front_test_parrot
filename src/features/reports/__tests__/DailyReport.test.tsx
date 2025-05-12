import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DailyReport from '../../reports/components/DailyReport';
import {useDailyreport} from '../hooks/useDailyReport';

// Mocks
jest.mock('../../reports/hooks/useDailyReport');

const mockHandleFetchReport = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    (useDailyreport as jest.Mock).mockReturnValue({
        reports: [],
        handleFetchReport: mockHandleFetchReport,
    });
});

describe('DailyReport', () => {
    it('renderiza los campos y el botón', () => {
        render(<DailyReport />);

        expect(screen.getByText(/reporte diario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/fecha inicio/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/fecha fin/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /consultar reporte/i })).toBeInTheDocument();
    });

    it('muestra errores si los campos están vacíos y se intenta enviar', async () => {
        render(<DailyReport />);

        const button = screen.getByRole('button', { name: /consultar reporte/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/la fecha de inicio es obligatoria/i)).toBeInTheDocument();
            expect(screen.getByText(/la fecha de fin es obligatoria/i)).toBeInTheDocument();
        });
    });

    it('llama a handleFetchReport con fechas válidas', async () => {
        render(<DailyReport />);

        const startDateInput = screen.getByLabelText(/fecha inicio/i);
        const endDateInput = screen.getByLabelText(/fecha fin/i);
        const button = screen.getByRole('button', { name: /consultar reporte/i });

        // Simula fechas válidas (puede variar según cómo esté renderizado Calendar)
        await userEvent.type(startDateInput, '2023-12-01');
        await userEvent.type(endDateInput, '2023-12-31');

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockHandleFetchReport).toHaveBeenCalledWith('2023-12-01', '2023-12-31');
        });
    });

    it('renderiza la tabla vacía si no hay reportes', () => {
        render(<DailyReport />);
        expect(screen.getByText(/no hay contenidos disponibles/i)).toBeInTheDocument();
    });
});
