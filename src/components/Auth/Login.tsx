import React from "react";
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import styles from './Login.module.css';
import {useLogin} from "../../hooks/auth/useLogin";


const Login = () => {
    const { email, setEmail, loading, error, handleLogin } = useLogin();
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginBox}>
                <h2>Inicio de sesión</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="email">Correo electrónico</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu email"
                            type="email"
                        />
                    </div>
                    <Button
                        label={loading ? "Iniciando sesión..." : "Iniciar sesión"}
                        onClick={handleLogin}
                        disabled={loading}
                    />
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
