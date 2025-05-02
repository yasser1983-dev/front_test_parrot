import {Calendar} from 'primereact/calendar';
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import styles from './DailyReport.module.css';
import {Controller, useForm} from "react-hook-form";
import {FormValuesReport} from "../../types/formValues";
import {useDailyreport} from "../../hooks/report/useDailyReport";


const DailyReport = () => {
    const {reports, handleFetchReport} = useDailyreport();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValuesReport>();

    const onSubmit = (data: FormValuesReport) => {
        handleFetchReport(data.startDate, data.endDate);
    };

    return (
        <>
            <div className={styles.reportWrapper}>
                <div className={styles.reportBox}>
                    <h2>Reporte diario</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.flexResponsive}>
                        <div className={`p-field ${styles.marginBottom}`}>
                            <label htmlFor="startDate">Fecha inicio </label>
                            <Controller
                                name="startDate"
                                control={control}
                                defaultValue={null}
                                rules={{required: "La fecha de inicio es obligatoria"}}
                                render={({field}) => (
                                    <Calendar
                                        {...field}
                                        showIcon
                                        locale="es"
                                        id="startDate"
                                        placeholder="Selecciona la fecha de inicio"
                                        className={errors.startDate ? "p-invalid" : ""}
                                    />
                                )}
                            />
                        </div>

                        <div className={`p-field ${styles.marginBottom}`}>
                            <label htmlFor="endDate">Fecha fin </label>
                            <Controller
                                name="endDate"
                                control={control}
                                defaultValue={null}
                                rules={{required: "La fecha de fin es obligatoria"}}
                                render={({field}) => (
                                    <Calendar
                                        {...field}
                                        showIcon
                                        locale="es"
                                        id="endDate"
                                        placeholder="Selecciona la fecha de fin"
                                        className={errors.endDate ? "p-invalid" : ""}
                                    />
                                )}
                            />
                        </div>

                        <div className={`p-field ${styles.marginBottom}`}>
                            <Button
                                type="submit"
                                label="Consultar Reporte"
                                className="p-button-sm"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <DataTable value={reports} tableStyle={{minWidth: '50rem', maxWidth: '1000px'}}
                           emptyMessage="No hay contenidos disponibles.">
                    <Column field="name" header="Nombre del artículo" />
                    <Column field="total_quantity" header="Cantidad total de artículos vendidos" bodyStyle={{ textAlign: 'center' }} />
                    <Column field="total_price" header="Precio total de artículos vendidos" bodyStyle={{ textAlign: 'center' }} />
                </DataTable>
            </div>
        </>
    );
};

export default DailyReport;
