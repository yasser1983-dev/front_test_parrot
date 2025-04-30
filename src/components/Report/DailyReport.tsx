import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import {fetchDailyReport} from "../../redux/slices/reportSlice";
import { AppDispatch } from '../../redux/store';

const DailyReport = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const dispatch = useDispatch<AppDispatch>(); // Tipar el dispatch


    const handleFetchReport = () => {
        let startString: string | null = null;
        if (startDate instanceof Date) {
            const year = startDate.getFullYear();
            const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
            const day = String(startDate.getDate()).padStart(2, '0');
            startString = `${year}-${month}-${day}`;
        }

        let endString: string | null = null;
        if (endDate instanceof Date) {
            const year = endDate.getFullYear();
            const month = String(endDate.getMonth() + 1).padStart(2, '0');
            const day = String(endDate.getDate()).padStart(2, '0');
            endString = `${year}-${month}-${day}`;
        }

        if (startString && endString) {
            dispatch(fetchDailyReport({ startDate: startString!, endDate: endString! }));
        } else {
            // Manejar el caso en que startDate o endDate son null
            console.warn("Por favor, selecciona ambas fechas para generar el reporte.");
            // O podrías despachar una acción de error, o no hacer nada.
        }
    };
    return (
        <div>
            <h2>Reporte Diario</h2>
            <Calendar value={startDate} onChange={(e) => setStartDate(e.value as Date | null)} showIcon />
            <Calendar value={endDate} onChange={(e) => setEndDate(e.value as Date | null)} />
            <Button label="Consultar Reporte" onClick={handleFetchReport} />
            <ul>
                {/*{report.map(item => (*/}
                {/*    <li key={item.name}>{item.name}: {item.quantity} vendidos por {item.total}</li>*/}
                {/*))}*/}
            </ul>
        </div>
    );
};

export default DailyReport;
