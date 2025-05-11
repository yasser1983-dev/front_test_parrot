import MainLayout from '../../../layouts/components/MainLayout';
import OrderForm from './OrderForm';
import OrderTable from "./OrderTable";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks";
import {useEffect, useRef} from "react";
import {loadState} from "../../../utils/localStorage";
import {addOrder} from "../orderSlice";


const OrderFormPage = () => {
    const orders = useAppSelector((state) => state.orders);

    const dispatch = useAppDispatch();
    const hasLoaded = useRef(false);

    useEffect(() => {
        if (!hasLoaded.current) {
            const savedOrders = loadState('orders');
            if (savedOrders && savedOrders !== "null" && orders.length === 0) {
                dispatch(addOrder(savedOrders));
                hasLoaded.current = true;
            }
        }
    }, [dispatch, orders]);

    return (
        <MainLayout>
            <OrderForm/>
            <OrderTable orders={orders}/>
        </MainLayout>
    );
};
export default OrderFormPage;
