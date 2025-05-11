import 'reflect-metadata';

import {useEffect} from "react";
import type {AppProps} from "next/app";
import {Provider, useSelector} from "react-redux";
import store, {RootState} from "../redux/store";
import {finishLoading, setUser} from "../redux/slices/authSlice";
import {useAppDispatch} from "../hooks/hooks";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos básicos de PrimeReact
import 'primeicons/primeicons.css'; // Iconos de PrimeReact
import '../styles/globals.css';

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail && savedEmail !== "null") {
            dispatch(setUser({ email: savedEmail }));
        } else {
            dispatch(finishLoading());
        }
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;

    return <>{children}</>;
};

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthLoader>
                <Component {...pageProps} />
            </AuthLoader>
        </Provider>
    );
}
