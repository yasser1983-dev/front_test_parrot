// components/Auth/Login.tsx
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // Llamada al backend para validar el email y obtener el token
        const response = await axios.post("/api/login", { email });
        dispatch(setUser({ email: response.data.email }));
    };

    return (
        <div className="login-container">
            <h2>Inicio de Sesión</h2>
            <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
            />
            <Button label="Iniciar sesión" onClick={handleLogin} />
        </div>
    );
};

export default Login;
