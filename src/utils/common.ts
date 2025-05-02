export const validateEmail = (email: string): string | boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return "El correo electrónico es requerido.";
    } else if (!regex.test(email)) {
        return "El correo electrónico no es válido.";
    }
    return true;
};

export const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
