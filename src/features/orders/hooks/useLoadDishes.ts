import {SalesService} from "../SalesServices";
import {useEffect, useState} from "react";
import {container} from "tsyringe";

export const useLoadDishes = () => {
    const [itemOptions, setItemOptions] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [, setLoadingDishes] = useState(true);
    const [, setErrorLoadingDishes] = useState<Error | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadDishes = async () => {
            if (token) {
                try {
                    const service = container.resolve(SalesService);
                    const response = await service.getDishes(token);
                    const formattedItems = response.map((item: { name: string; id: number }) => ({
                        label: item.name,
                        value: item.id,
                    }));
                    setItemOptions(formattedItems);
                    setLoadingDishes(false);
                    setDishes(response);
                } catch (error) {
                    console.error('Error al cargar los platillos:', error);
                    if (error instanceof Error) {
                        setErrorLoadingDishes(error);
                    } else {
                        setErrorLoadingDishes(new Error("Error desconocido"));
                    }
                    setLoadingDishes(false);
                }
            } else {
                setLoadingDishes(false);
                setErrorLoadingDishes(new Error("Token no encontrado"));
            }
        };

        loadDishes();
    }, [token]);

    return {itemOptions, dishes};
};


