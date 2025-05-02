import MainLayout from '../components/layouts/MainLayout';
import OrderForm from '../components/orders/OrderForm';
import OrderTable from "../components/orders/OrderTable";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useEffect, useRef} from "react";
import {loadState} from "../utils/localStorage";
import {addOrder} from "../redux/slices/orderSlice";


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
