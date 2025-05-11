import {useState} from "react";
import {useDispatch} from "react-redux";
import {AuthServices} from "../../services/authServices";
import {setUser} from "../../redux/slices/authSlice";
import {validateEmail} from "../../utils/common";
import {useRouter} from "next/router";
import {container} from "tsyringe";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const service = container.resolve(AuthServices);

    const handleLogin = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const resultValidation: string | boolean = validateEmail(email)
            if (typeof resultValidation === 'boolean') {
                const response = await service.loginUser(email);
                const {token} = response;
                if (token) {
                    dispatch(setUser({email}));
                    localStorage.setItem("token", token);
                    localStorage.setItem("email", email);
                    router.push("/");
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
