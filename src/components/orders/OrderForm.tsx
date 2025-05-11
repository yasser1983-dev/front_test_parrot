import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import styles from '../../styles/OrderForm.module.css';
import {Dropdown} from 'primereact/dropdown';
import {useOrderDispatch} from "../../hooks/sales/useOrderDispatch";
import {useLoadDishes} from "../../hooks/sales/useLoadDishes";
import {OrderInterface} from '../../types/interfaces';
import {InputNumber} from 'primereact/inputnumber';
import {Controller, useForm} from "react-hook-form";
import {FormValuesOrder} from "../../types/formValues";
import {SalesService} from "../../services/salesServices";
import { container } from 'tsyringe';

const OrderForm = () => {
    const {itemOptions, dishes} = useLoadDishes() as { itemOptions: [], dishes: [] };
    const {
        token,
        itemName,
        totalCost,
        setDish,
        dishTotalCost,
        registerInState,
    } = useOrderDispatch(dishes);

    const service = container.resolve(SalesService);

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValuesOrder>();

    const onSubmit = async (data: FormValuesOrder) => {

        const result: Promise<any> = await service.sendOrders(token, data);
        const customerName = data.customerName;
        const quantity = data.quantity;
        const order: OrderInterface = {customerName, itemName, quantity, totalCost};
        registerInState(order, result);
        reset({
            customerName: "",
            itemId: null,
            quantity: 1,
        });
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginBox}>
                <h2>Punto de venta</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className={`p-field ${styles.marginBottom}`}>
                        <label htmlFor="customerName">Nombre del comensal</label>
                        <Controller
                            name="customerName"
                            control={control}
                            defaultValue=""
                            rules={{required: "Este campo es obligatorio"}}
                            render={({field}) => (
                                <InputText
                                    {...field}
                                    id="customerName"
                                    className={errors.customerName ? "p-invalid" : ""}
                                    placeholder="Nombre del comensal"
                                />
                            )}
                        />
                        {errors.customerName && (
                            <small className="p-error">{errors.customerName.message}</small>
                        )}
                    </div>

                    <div className={`p-field ${styles.marginBottom}`}>
                        <label htmlFor="itemName">Nombre del artículo</label>
                        <Controller
                            name="itemId"
                            control={control}
                            defaultValue={undefined}
                            rules={{required: "Selecciona un artículo"}}
                            render={({field}) => (
                                <Dropdown
                                    {...field}
                                    id="itemId"
                                    key={field.value ?? 'reset'}
                                    value={field.value}
                                    options={itemOptions}
                                    placeholder="Selecciona un artículo"
                                    emptyMessage="No hay opciones disponibles"
                                    className={errors.itemId ? "p-invalid" : ""}
                                    onChange={(e) => {
                                        setDish(e.value);
                                        field.onChange(e.value);
                                    }}
                                />
                            )}
                        />
                        {errors.itemId && (
                            <small className="p-error">{errors.itemId.message}</small>
                        )}
                    </div>

                    <div className={`p-field ${styles.marginBottom}`}>
                        <label htmlFor="quantity">Cantidad</label>
                        <Controller
                            name="quantity"
                            control={control}
                            defaultValue={0}
                            rules={{
                                required: "Indica la cantidad",
                                min: {value: 1, message: "Mínimo 1"},
                            }}
                            render={({field}) => (
                                <InputNumber
                                    {...field}
                                    id="quantity"
                                    value={field.value}
                                    mode="decimal"
                                    showButtons
                                    min={1}
                                    max={100}
                                    className={errors.quantity ? "p-invalid" : ""}
                                    onValueChange={(e) => {
                                        field.onChange(e.value); // Update the value in react-hook-form
                                        dishTotalCost(Number(e.value)); // Call the cost function
                                    }}
                                    placeholder="Cantidad"
                                />
                            )}
                        />
                        {errors.quantity && (
                            <small className="p-error">{errors.quantity.message}</small>
                        )}
                    </div>

                    <div className={`p-field ${styles.marginBottom}`}>
                        <label htmlFor="totalCost">Costo total</label>
                        <InputText
                            readOnly={true}
                            id="totalCost"
                            value={String(totalCost)}
                            placeholder="Costo Total"
                        />
                    </div>

                    <div>
                        <Button
                            label="Agregar orden"
                            className="p-button-sm"
                        />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default OrderForm;