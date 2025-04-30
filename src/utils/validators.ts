export const validateEmail = (email: string): string | boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return "El correo electrónico es requerido.";
    } else if (!regex.test(email)) {
        return "El correo electrónico no es válido.";
    }
    return true;
};
