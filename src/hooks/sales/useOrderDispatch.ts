import {useState} from "react";
import {useDispatch} from "react-redux";
import {addOrder} from "../../redux/slices/orderSlice";
// import {logout} from "../../redux/slices/authSlice";
import {DishInterfaces} from "../../types/interfaces";

export const useOrderDispatch = (dishes: DishInterfaces[]) => {
    const dispatch = useDispatch();
    const [customerName, setCustomerName] = useState("");
    const [itemId, setItemId] = useState(0);
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [totalCost, setTotalCost] = useState(0);
    const token = localStorage.getItem('token');

    const dispatchOrder = () => {
        const order = {customerName, itemName, quantity, totalCost};
        dispatch(addOrder(order));
        setCustomerName("");
        setItemName("");
        setQuantity(1);
        setTotalCost(0);
    };

    // const dispatchLogout = () => dispatch(logout());

    const dishTotalCost = (quantityValue: Number, itemIdOptional: Number = 0) => {
        setQuantity(Number(quantityValue));
        const id = itemIdOptional > 0 ? itemIdOptional : itemId;
        if ((itemId > 0 || itemIdOptional > 0) && quantityValue > 0) {
            const selectedDish = dishes.find((dish: DishInterfaces) => dish.id === id);
            if (selectedDish) {
                const totalPrice = Number(selectedDish?.price ?? 0) * Number(quantityValue);
                setTotalCost(totalPrice);
            } else {
                setTotalCost(0);
            }
        }
    }

    const setDish = (itemId: Number) => {
        const selectedDish = dishes.find((dish: DishInterfaces) => dish.id === itemId);
        setItemName(selectedDish?.name ?? "");
        setItemId(Number(itemId));
        dishTotalCost(quantity, itemId);
    }

    return {
        token,
        totalCost,
        setDish,
        setTotalCost,
        dishTotalCost,
        dispatchOrder
    };
};