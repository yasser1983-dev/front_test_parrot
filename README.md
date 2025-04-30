# front_test_parrot

### Estructura del Proyecto
src/
├── assets/                           # Archivos estáticos como imágenes, fuentes, etc.
├── components/                       # Componentes reutilizables
│   ├── Auth/
│   │   └── Login.tsx                 # Pantalla de inicio de sesión
│   ├── POS/                          
│   │   ├── OrderForm.tsx             # Formulario para dar de alta una orden
│   │   ├── ItemList.tsx              # Listado de artículos ordenados
│   └── Report/
│       └── DailyReport.tsx           # Pantalla para el reporte diario
├── redux/                            # Configuración de Redux Toolkit
│   ├── slices/
│   │   ├── authSlice.ts              # Slice para manejo de autenticación
│   │   ├── orderSlice.ts             # Slice para manejar las órdenes
│   │   └── reportSlice.ts            # Slice para manejar el reporte diario
│   └── store.ts                      # Configuración del store de Redux
├── services/                         # API service para realizar las peticiones
│   └── api.ts                        # Servicio que contiene los métodos de axios
├── utils/                            # Funciones y utilidades comunes
│   └── formatCurrency.ts             # Formatear valores monetarios
├── hooks/                          
│   └── auth/
│       └── useLogin.ts
├── App.tsx                           # Componente principal que incluye rutas y estado
└── index.tsx                         # Entrada principal de la aplicación


## Patrones de diseño aplicados

a. **Patrón de Componentes Reutilizables**:

  Se crea una carpeta components/ con componentes reutilizables que se emplean en varias pantallas, como OrderForm, ItemList, etc. Esta separación permite que el código sea más modular y fácil de mantener.

b. **Patrón de State Management con Redux Toolkit**

  Se emplea Redux Toolkit para gestionar el estado de la aplicación, como el estado de la sesión de usuario (authSlice), las órdenes (orderSlice), y el reporte diario (reportSlice).

c. **Patrón de API Service**

   Axios se utiliza para interactuar con el backend, y se centraliza la configuración de las peticiones HTTP en un servicio (api.ts), lo que ayuda a mantener el código limpio y facilita las pruebas.
