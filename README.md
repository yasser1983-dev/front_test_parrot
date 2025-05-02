# front_test_parrot

### Requerimientos de Negocio
Se tiene que crear un punto de venta “Express” que se pueda usar desde
cualquier navegador. Será usado por meseros para dar de alta las órdenes de
comensales. Se podrá usar desde dispositivos móviles y de escritorio.

### Estructura del Proyecto
```bash
src/
├── assets/                           # Archivos estáticos como imágenes, fuentes, etc.
│   └── images/
├── components/                       # Componentes reutilizables
│   ├── auth/
│   │   └── Login.tsx                 # Pantalla de inicio de sesión
│   │   └── Login.test.tsx            # Test para autenticación
│   │   └── Login.module.css          # Estilo para css
│   ├── layouts/                          
│   │   ├── MainLayout.module.css     # Estilo de la plantilla
│   │   ├── MainLayout.tsx            # Plantilla del proyecto para poner banner, cierre sesion y menú simple
│   ├── orders/
│   │   ├── OrderFom.module.css       # Estilo del formalario punto de venta
│   │   ├── OrderFom.tsx              # JSX del formulario punto de venta
│   │   └── OrderTable.tsx            # JSX de la tabla para mostrar las órdenes de compra enviadas
│   └── report/                       # Componente para reporte
│       ├── DailyReport.module.css    # Estilo para la vista de reporte
│       └── DailyReport.tsx           # Componente del reporte
├── redux/                            # Configuración de Redux Toolkit
│   ├── slices/                       
│   │   ├── authSlice.ts              # Slice para manejo de autenticación
│   │   ├── orderSlice.ts             # Slice para manejar las órdenes
│   │   └── reportSlice.ts            # Slice para manejar el reporte diario
│   └── store.ts                      # Configuración del store de Redux
├── pages/                            # Funciones y utilidades comunes
│   ├── OrderFormPages.tsx            # La página que aglutina los componentes para la pantalla del punto de venta
│   └── ReportPages.ts                # La página que aglutina los componentes para la pantalla de reporte diario
├── services/                         # API service para realizar las peticiones
│   │   └── authService.ts            # Servicio específico de autenticación
│   │   └── salesService.ts           # Servicio específico de órdenes
│   │   └── reportService.ts          # Servicio específico de reportes
│   └── api.ts                        # Servicio que contiene los métodos comunes de axios
├── types/                            # Funciones y utilidades comunes
│   ├── formValues.ts                 # Todos los types que se necesitan para los formularios
│   └── interfaces.ts                 # Las interfaces de todo el proyecto
├── utils/                            # Funciones y utilidades comunes
│   ├── common.ts                     # Funciones de uso común para cualquier componente
│   └── localStorage.ts               # Funciones para manejar el localStorage
├── hooks/                            # Hooks personalizados
│   ├── auth/
│   │   └── useLogin.ts               # Hook para login
│   ├── layout/
│   │   └── useLayout.ts              # Hook para layout
│   ├── sales/
│   │   └── useLoadDishes.ts          # Hook para manejar los platillos de comidas
│   │   └── useOrderDispatch.ts       # Hook para gestionar las ordenes
│   └── report/
│       └── useDailyReport.ts         # Hook para reportes
├── App.tsx                           # Componente principal que incluye rutas y estado
└── index.tsx                         # Entrada principal de la aplicación
```

### Requisitos previos antes de la instalación

Es necesario tener instalado previamente los siguiente: Node.js y npm/yarn/pnpm
Tener ejecutando el backend donde se encuentran los servicios o API REST que utiliza este proyecto, así como la base de datos.

### Instalación y configuración de variables del proyecto

Se debe instalar y configurar el proyecto antes de ejecutar, para a continuación se encuentra el comando para instalar las dependencias y 
las indicaciones para configurar el archivo .env

```bash
  npm install
```
Para crear el archivo de configuración se debe utilizar el archivo envExample el cual contiene la variable y un ejemplo de posible valor para conocer la ruta
o la url necesaria para que el proyect oconozca la ubicación del servicio de backend con el cual debe interactuar.

### Para ejecutar
Para ejecutar el proyecto solo se necesita ejecutar el siguiente comando

```bash
  npm start
```

## Patrones de diseño aplicados

a. **Patrón de Componentes Reutilizables**:

Se crea una carpeta components/ con componentes reutilizables que se emplean en varias pantallas, como OrderForm,
ItemList, etc. Esta separación permite que el código sea más modular y fácil de mantener.

b. **Patrón de State Management con Redux Toolkit**

Se emplea Redux Toolkit para gestionar el estado de la aplicación, como el estado de la sesión de usuario (authSlice),
las órdenes (orderSlice), y el reporte diario (reportSlice).

c. **Patrón de API Service**

Axios se utiliza para interactuar con el backend, y se centraliza la configuración de las peticiones HTTP en un
servicio (api.ts), lo que ayuda a mantener el código limpio y facilita las pruebas.

d. **Presentational and Container Components (Separación de lógica y UI)**

Presentational Components: Solo renderizan UI, no tienen lógica de negocio.

Container Components: Contienen lógica de negocio y manejo de estado.

e. **Hooks Patterns**

Extraer lógica reutilizable en funciones que usan hooks.

f. **Feature-Based Folder Structure**

Organizar carpetas por funcionalidad y no por tipo de archivo

g. **Service Layer Pattern**   

Aislar llamadas HTTP en archivos de servicios para no acoplar lógica de red en los componentes.

### Ejecutar prueba
```bash
  npm test
```