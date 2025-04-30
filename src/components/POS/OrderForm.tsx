import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import styles from './OrderForm.module.css';
import {Dropdown} from 'primereact/dropdown';
import {useOrderDispatch} from "../../hooks/sales/useOrderDispatch";
import {useLoadDishes} from "../../hooks/sales/useLoadDishes";
import {Dish} from '../../interface/dish';
import {InputNumber} from 'primereact/inputnumber';


const OrderForm = () => {
    const { itemOptions, dishes } = useLoadDishes() as { itemOptions: [], dishes: Dish[] };
    const {
        customerName,
        itemId,
        quantity,
        totalCost,
        setDish,
        dishTotalCost,
        dispatchOrder,
        setCustomerName,
    } = useOrderDispatch(dishes);

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginBox}>
                <h2>Formulario para una orden</h2>
                <div className="p-fluid">
                        <div className={`p-field ${styles.marginBottom}`}>
                            <label htmlFor="customerName">Nombre del comensal</label>
                            <InputText
                                id="customerName"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Nombre del comensal"
                            />
                        </div>

                    <div className={`p-field ${styles.marginBottom}`}>
                        <label htmlFor="itemName">Nombre del artículo</label>
                        <Dropdown
                            value={itemId}
                            onChange={(e) => setDish(e.value)}
                            options={itemOptions}
                            placeholder="Selecciona un artículo"
                            className="p-dropdown-sm"
                        />
                    </div>

                    <div className={`p-field ${styles.marginBottom}`}>
                        <label htmlFor="quantity">Cantidad</label>
                        <InputNumber
                            id="quantity"
                            mode="decimal"
                            showButtons
                            min={0}
                            max={100}
                            value={quantity}
                            onChange={(e) => dishTotalCost(Number(e.value))}
                            placeholder="Cantidad"
                        />
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
                            onClick={dispatchOrder}
                            className="p-button-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;