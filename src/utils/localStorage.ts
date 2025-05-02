export const loadState = (name: string = 'state') => {
    try {
        const serializedState = localStorage.getItem(name);
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error(`Error al cargar "${name}" desde localStorage:`, err);
        return undefined;
    }
};

export const saveState = (state: any, name: string = 'state') => {
    try {
        const existing = localStorage.getItem(name);
        const parsed = existing ? JSON.parse(existing) : [];

        let updated;
        if (Array.isArray(state)) {
            updated = [...parsed, ...state]; // Añade los elementos individuales
        } else {
            updated = [...parsed, state];    // Añade un solo objeto
        }

        localStorage.setItem(name, JSON.stringify(updated));
    } catch {
        console.error('Error saving state');
    }
};