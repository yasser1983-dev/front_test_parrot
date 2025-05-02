import {NavigateFunction} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/authSlice";

export const useLayout = (navigate: NavigateFunction) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(logout());
        navigate('/login');
    };
    return {
        handleLogout
    };
}