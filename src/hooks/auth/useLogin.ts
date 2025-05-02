import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../services/authServices";
import {setUser} from "../../redux/slices/authSlice";
import {validateEmail} from "../../utils/common";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleLogin = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const resultValidation: string | boolean = validateEmail(email)
            if (typeof resultValidation === 'boolean') {
                const response = await loginUser(email);
                const {token} = response;
                if (token) {
                    dispatch(setUser({email}));
                    localStorage.setItem("token", token);
                }
            } else {
                setError(resultValidation);
            }
        } catch (err) {
            setError("Error al iniciar sesión. Por favor, intente de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        handleLogin,
    };
};
