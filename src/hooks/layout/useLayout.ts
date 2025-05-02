import {NavigateFunction} from 'react-router-dom';

export const useLayout = (navigate: NavigateFunction) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return {
        handleLogout
    };
}