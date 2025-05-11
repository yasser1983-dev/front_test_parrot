import {dateToString} from "../../../utils/common";
import {fetchDailyReport} from "../reportSlice";
import {addLocale} from "primereact/api";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks";

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar',
    dateFormat: 'dd/mm/yy',
});

export const useDailyreport = () => {
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state) => state.report.data);

    const handleFetchReport = (startDate: Date, endDate: Date) => {
        const startString: string = dateToString(startDate);
        const endString: string = dateToString(endDate);
        if (startString && endString) {
            dispatch(fetchDailyReport({startDate: startString!, endDate: endString!}));
        }
    };

    return {
        reports,
        handleFetchReport,
    };
}