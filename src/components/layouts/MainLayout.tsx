import {Button} from 'primereact/button';
import styles from './MainLayout.module.css';
import {Link, NavigateFunction, useNavigate} from 'react-router-dom';
import {MainLayoutProps} from "../../types/interfaces";
import {useLayout} from "../../hooks/layout/useLayout";
import {useAppSelector} from "../../hooks/hooks";
import logo from '../../assets/images/logo.png';
import word_parrot from '../../assets/images/word_parrot.svg';

const MainLayout = ({children}: MainLayoutProps) => {
    const navigate: NavigateFunction = useNavigate();
    const {
        handleLogout,
    } = useLayout(navigate);
    const email = useAppSelector((state) => state.auth.email);

    return (
        <div className={styles.layoutWrapper}>
            <header className={styles.header}>
                <div className={styles.logoTitle}>
                    <img
                        src={logo}
                        alt="Logo"
                        className={styles.logo}
                    />
                    <img
                        src={word_parrot}
                        alt="Parrot"
                        className={styles.logo}
                    />
                    <h1>Sistema de venta rápida</h1>
                </div>
                <div className={styles.actions}>
                    <Link to="/report" className={styles.link}>Reporte diario</Link>
                    <Link to="/pos" className={styles.link}>Punto de venta</Link>
                    <span>{email}</span>
                    <Button
                        label="Cerrar sesión"
                        className="p-button-danger p-button-sm"
                        onClick={handleLogout}
                    />
                </div>
            </header>

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
