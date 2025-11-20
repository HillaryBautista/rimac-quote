# RIMAC Quote App

## Descripción:
Este proyecto es una aplicación desarrollada en React + Vite que permite a los usuarios cotizar planes de salud de RIMAC de forma rápida.

El flujo principal consiste en:
- Ingreso de datos del usuario.
- Carga y selección de planes disponibles.
- Visualización del resumen final.

Incluye:
- Arquitectura modular por capas (domain, infra, ui)
- Manejo de estado global con Context + useReducer
- Consumo de APIs usando repositorios y casos de uso
- Validaciones con react-hook-form
- Pruebas unitarias con Vitest + Testing Library
- Coverage automatizado

--------------------------------------------
Cómo ejecutar el proyecto
--------------------------------------------

1. Clonar el repositorio
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>

2. Instalar dependencias
   npm install

3. Crear archivo de variables de entorno
   Crear un archivo llamado .env en la raíz con:

   VITE_API_BASE_URL=https://tu-api.com

4. Ejecutar en modo desarrollo
   npm run dev

   La app se abrirá en:
   http://localhost:5173

5. Generar build para producción
   npm run build

   El resultado quedará en la carpeta:
   dist/

--------------------------------------------
Scripts principales
--------------------------------------------

- npm run dev               → Levanta la app en modo desarrollo.
- npm run build             → Genera build de producción.
- npm run test              → Corre todos los tests.
- npm run test:watch        → Modo watch para testing.
- npm run test:coverage     → Genera reporte de coverage.
- npm run test:ui           → UI visual para tests.
- npm run test:coverage:ui  → Coverage con interfaz visual.

--------------------------------------------
Testing
--------------------------------------------

Todas las capas tienen cobertura de tests.

Actualmente el proyecto tiene cobertura en:
- Components
- Context
- Pages
- Domain usecases
- Infra repositories
- Utils

Frameworks de testing:
- Vitest
- @testing-library/react
- @testing-library/jest-dom

Coverage en:
- coverage/lcov.info → útil para subir a herramientas como SonarQube o Codecov.
- coverage/lcov-report/index.html → reporte visual en navegador.

--------------------------------------------
Estructura del proyecto
--------------------------------------------

```bash
src/
├── ui/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── navigation/
│
├── domain/
│   ├── entities/
│   ├── usecases/
│   └── repositories/
│
├── infra/
│   ├── http/
│   └── repositories/
│
└── assets/
```

--------------------------------------------
Cumplimiento de criterios
--------------------------------------------

✔ Pruebas unitarias  
✔ Manejo de estado  
✔ Consumo de APIs  
✔ Validación de formularios  
✔ Estructura de carpetas  
✔ HTML semántico  
✔ Git/Github  
✔ Clean Code  
✔ Performance  
✔ React  
✔ Diseño responsive  
✔ Arquitectura por capas  

--------------------------------------------
Autor
--------------------------------------------

Hillary Bautista  
Developer  
