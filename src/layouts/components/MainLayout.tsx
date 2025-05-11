'use client';

import Image from 'next/image';
import { Button } from 'primereact/button';
import styles from '../../styles/mainLayout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainLayoutProps } from '../../types/interfaces';
import { useLayout } from '../hooks/useLayout';
import { useAppSelector } from '../../shared/hooks';
import logo from '../../assets/images/logo.png';
import word_parrot from '../../assets/images/word_parrot.svg';

const MainLayout = ({ children }: MainLayoutProps) => {
    const router = useRouter();
    const { handleLogout } = useLayout();
    const email = useAppSelector((state) => state.auth.email);

    return (
        <div className={styles.layoutWrapper}>
            <header className={styles.header}>
                <div className={styles.logoTitle}>
                    <Image
                        src={logo} // Usando la importación de la imagen
                        alt="Logo"
                        className={styles.logo}
                    />
                    <Image
                        src={word_parrot}
                        alt="Parrot"
                        className={styles.logo}
                    />
                    <h1>Sistema de venta rápida</h1>
                </div>
                <div className={styles.actions}>
                    <Link href="/report" className={styles.link}>Reporte diario</Link>
                    <Link href="/pos" className={styles.link}>Punto de venta</Link>
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
