# front_test_parrot

### Requerimientos de Negocio
Se tiene que crear un punto de venta “Express” que se pueda usar desde
cualquier navegador. Será usado por meseros para dar de alta las órdenes de
comensales. Se podrá usar desde dispositivos móviles y de escritorio.

### Estructura del Proyecto
```bash
src/
├── assets/                          # Archivos estáticos (imágenes, íconos, etc.)
│   └── images/
│       ├── logo.png
│       └── word_parrot.svg

├── features/                        # Dominios del negocio (modular, orientado a DDD)
│   ├── auth/                        # Módulo de autenticación
│   │   ├── components/              # Componentes propios del dominio
│   │   │   ├── AuthLoader.ts
│   │   │   └── Login.tsx
│   │   │   └── __tests__/           # Tests de componentes
│   │   │       ├── AuthLoader.test.ts
│   │   │       └── Login.test.tsx
│   │   ├── hooks/                   # Custom hooks ligados a auth
│   │   │   └── useLogin.ts
│   │   │   └── __tests__/           # Tests de hooks
│   │   │       └── useLogin.test.ts
│   │   ├── authSlice.ts             # Slice de Redux
│   │   └── AuthService.ts           # Lógica de negocio / API

│   ├── orders/                      # Módulo de pedidos
│   │   ├── components/
│   │   │   ├── OrderFormPage.tsx
│   │   │   ├── OrderTable.tsx
│   │   │   └── OrderForm.tsx
│   │   │   └── __tests__/
│   │   │       └── OrderForm.test.tsx
│   │   ├── hooks/
│   │   │   ├── useOrderDispatch.ts
│   │   │   └── useLoadDishes.ts
│   │   │   └── __tests__/
│   │   │       └── useLoadDishes.test.ts
│   │   ├── orderSlice.ts
│   │   └── SalesServices.ts

│   ├── reports/                     # Módulo de reportes
│   │   ├── components/
│   │   │   ├── DailyReports.tsx
│   │   │   └── ReportPage.tsx
│   │   │   └── __tests__/
│   │   │       └── DailyReports.test.tsx
│   │   ├── hooks/
│   │   │   └── useDailyReports.ts
│   │   │   └── __tests__/
│   │   │       └── useDailyReports.test.ts
│   │   ├── reportSlice.ts
│   │   └── ReportServices.ts

├── layouts/                         # Layouts reutilizables
│   ├── components/
│   │   └── MainLayout.tsx
│   └── hooks/
│       └── useLayout.ts

├── pages/                           # Enrutamiento con Pages Router de Next.js
│   ├── _app.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── pos.tsx
│   └── report.tsx

├── redux/                           # Configuración global de Redux Toolkit
│   └── store.ts

├── shared/                          # Código reutilizable común a varios dominios
│   ├── BaseService.ts
│   └── hooks.ts                     # Hooks reutilizables y genéricos

├── styles/                          # Estilos globales y modulares
│   ├── globals.css
│   ├── index.css
│   ├── login.module.css
│   ├── mainLayout.module.css
│   ├── dailyReports.module.css
│   └── orderForm.module.css

├── types/                           # Tipos y definiciones globales
│   ├── formValues.ts
│   ├── images.d.ts
│   └── interfaces.ts

├── utils/                           # Funciones utilitarias y helpers
│   ├── common.ts
│   └── localStorage.ts

├── config.ts                        # Configuración global de la app
├── ContainerConfig.ts              # Configuración por entorno o inyección
├── jest.config.ts                  # Configuración de pruebas con Jest
├── reportWebVitals.ts              # Métricas de rendimiento
└── setupTests.ts                   # Inicialización de entorno de pruebas


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

10. **Inyección de dependencias**
 Permite testear componentes. Se puede inyectar mocks desde el provider. Permite múltiples entornos: producción, pruebas, staging, etc.

11. **Singleton**
Para tener una sola instancia en todo el proyecto de las clases de servicio.

12. **Feature-based Architecture (orientada a funcionalidades)**
 Este patrón organiza el código por feature o dominio de negocio. Facilita la escalabilidad.Reduce el acoplamiento entre módulos.
 Mejora la mantenibilidad y el entendimiento del código. Hace más simple trabajar en paralelo en distintos equipos o funcionalidades.

13. **Relación con Domain-Driven Design (DDD)**
Cada carpeta dentro de features/ representa un Bounded Context. Contiene todo lo necesario para funcionar de forma cohesiva y autónoma

### Ejecutar prueba
```bash
  npm test
```