import {useDispatch} from "react-redux";
import {logout} from "../../features/auth/authSlice";
import {NextRouter, useRouter} from "next/router";

export const useLayout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(logout());
        router.push("/login");
    };
    return {
        handleLogout
    };
}