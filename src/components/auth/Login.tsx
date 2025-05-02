    import React from "react";
    import {InputText} from 'primereact/inputtext';
    import {Button} from 'primereact/button';
    import styles from './Login.module.css';
    import {useLogin} from "../../hooks/auth/useLogin";
    import {Controller, useForm} from "react-hook-form";
    import {validateEmail} from "../../utils/common";
    import {FormValuesLogin} from "../../types/formValues";

    const Login = () => {
        const {loading, error, handleLogin} = useLogin();

        const {
            handleSubmit,
            control,
            formState: {errors},
        } = useForm<FormValuesLogin>();

        const onSubmit = (data: FormValuesLogin) => {
            handleLogin(data.email);
        };

        return (
            <div className={styles.loginWrapper}>
                <div className={styles.loginBox}>
                    <h2>Inicio de sesión</h2>
                    <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
                        <div className={`p-field ${styles.marginBottom}`}>
                            <label htmlFor="email">Correo electrónico</label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "El correo es obligatorio",
                                    validate: validateEmail,
                                }}
                                render={({field}) => (
                                    <InputText
                                        {...field}
                                        id="email"
                                        className={errors.email ? "p-invalid" : ""}
                                        placeholder="Ingresa tu email"
                                        type="email"
                                    />
                                )}
                            />
                            {errors.email && (
                                <small className="p-error">{errors.email.message}</small>
                            )}
                        </div>

                        <Button
                            type="submit"
                            label={loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            disabled={loading}
                        />

                        {error && <p className={styles.errorMessage}>{error}</p>}
                    </form>
                </div>
            </div>
        );
    };

    export default Login;
