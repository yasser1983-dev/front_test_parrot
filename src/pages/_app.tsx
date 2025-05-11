import 'reflect-metadata';
import Head from 'next/head';
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import store from "../redux/store";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos básicos de PrimeReact
import 'primeicons/primeicons.css'; // Iconos de PrimeReact
import '../styles/globals.css';
import AuthLoader from "../components/auth/AuthLoader";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthLoader>
                <Head>
                    <title>Parrot proyecto | Sistema de venta rápida</title>
                    <meta name="description" content="Aplicación web para la empresa Parrot. Esto es una prueba para simular sistema de venta" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </AuthLoader>
        </Provider>
    );
}
