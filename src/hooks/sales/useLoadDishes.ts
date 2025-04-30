import {get_dishes} from "../../services/salesServices";
import {useEffect, useState} from "react";

export const useLoadDishes = () => {
    const [itemOptions, setItemOptions] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [loadingDishes, setLoadingDishes] = useState(true);
    const [errorLoadingDishes, setErrorLoadingDishes] = useState<Error | null>(null);

    useEffect(() => {
        const loadDishes = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await get_dishes(token);
                    const formattedItems = response.map((item: { name: string; id: number }) => ({
                        label: item.name,
                        value: item.id,
                    }));
                    setItemOptions(formattedItems);
                    setLoadingDishes(false);
                    setDishes(response);
                } catch (error) {
                    console.error('Error al cargar los platillos:', error);
                    setErrorLoadingDishes(error);
                    setLoadingDishes(false);
                }
            } else {
                setLoadingDishes(false);
                setErrorLoadingDishes(new Error("Token no encontrado"));
            }
        };

        loadDishes();
    }, []);

    return { itemOptions, dishes, loadingDishes, errorLoadingDishes };
};


