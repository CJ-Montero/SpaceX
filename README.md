# SpaceX-WebApp

Aplicación web desarrollada con **Angular 19** que consume la API de SpaceX para mostrar información sobre lanzamientos y cohetes. Utiliza **Tailwind CSS** para un diseño inspirado en la estética de SpaceX, con autenticación básica mediante `localStorage`.

## Requisitos previos

- **Node.js**: Versión 18 o 20. Verifica con:
  ```bash
  node -v
  ```
  Descarga desde [nodejs.org](https://nodejs.org) si es necesario.
- **Angular CLI**: Versión 19. Instala globalmente:
  ```bash
  npm install -g @angular/cli@19
  ```
- **Git**: Para clonar el repositorio.
- Un editor de código (recomendado: VS Code).

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/CJ-Montero/SpaceX-WebApp.git
   cd SpaceX-WebApp
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las credenciales de prueba**:
   - Abre el navegador, inicia la aplicación (ver más abajo), y usa el botón **Usar Admin/Admin** en la pantalla de login para establecer las credenciales `admin`/`admin` en `localStorage`.
   - Alternativamente, en la consola del navegador (`F12` > Console):
     ```javascript
     localStorage.setItem('user', JSON.stringify({ username: 'admin', password: 'admin' }));
     ```

## Ejecución

1. **Inicia el servidor de desarrollo**:
   ```bash
   ng serve
   ```
   La aplicación estará disponible en `http://localhost:4200`.

2. **Accede a la aplicación**:
   - Ve a `http://localhost:4200/login`.
   - Inicia sesión con las credenciales `admin`/`admin`.

## Estructura del proyecto

- **`src/app/auth/`**: Contiene el componente de login (`LoginComponent`) y el guardia de autenticación (`AuthGuard`).
- **`src/app/core/`**: Incluye el componente principal (`HomeComponent`), el servicio para la API de SpaceX (`SpacexService`), y el componente de configuración (`SettingsComponent`).
- **`src/app/core/models/`**: Define las interfaces para los datos de la API (`spacex.models.ts`).
- **`src/app/app.routes.ts`**: Configuración de rutas de la aplicación.
- **`src/styles.css`**: Estilos globales con Tailwind CSS.

## Funcionalidades

- **Login**: Autenticación simulada con `localStorage`. Usa `admin`/`admin` para acceder.
- **Home**:
  - **Lanzamiento Aleatorio**: Muestra detalles del último lanzamiento (nombre, fecha, detalles, éxito, imagen, y enlace al webcast).
  - **Cohetes**: Lista todos los cohetes con descripción, dimensiones e imágenes.
  - **Búsqueda de misiones**: (Pendiente de corrección, requiere ajuste en `SpacexService`).
- **Configuración**: Permite cerrar sesión.
- **Diseño**: Usa Tailwind CSS vía CDN con una temática oscura inspirada en SpaceX/X.

## Contribuir

1. **Clona el repositorio** y crea una rama:
   ```bash
   git checkout -b mi-rama
   ```

2. **Realiza cambios** y confirma:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   ```

3. **Sube los cambios**:
   - Configura autenticación con un **Personal Access Token** (PAT):
     - Ve a GitHub > Configuración > Configuración de desarrollador > Tokens de acceso personal > Generar nuevo token (clásico).
     - Selecciona el permiso `repo`.
     - Copia el token (ej. `ghp_abc123...`).
     - Actualiza el remoto:
       ```bash
       git remote set-url origin https://<TU_USUARIO>:<TU_PAT>@github.com/CJ-Montero/SpaceX-WebApp.git
       ```
   - Empuja los cambios:
     ```bash
     git push -u origin mi-rama
     ```

4. **Crea un Pull Request** en GitHub.

## Tareas pendientes

- Corregir la función `searchMission` en `SpacexService` para usar una solicitud POST a `/launches/query` con un cuerpo JSON.
- Mejorar el manejo de errores en las peticiones de la API.
- Añadir más elementos de diseño (ej. logo de SpaceX, animaciones).
- Completar pruebas unitarias para componentes y servicios.

## Resolución de problemas

- **Error: "Could not find '@angular-devkit/build-angular'"**:
  ```bash
  npm install --save-dev @angular-devkit/build-angular@19
  ```
- **Error de autenticación en GitHub**:
  Usa un PAT o configura SSH (ver [GitHub Docs](https://docs.github.com/es/authentication)).
- **Errores en `HomeComponent`**:
  Asegúrate de que `spacex.models.ts` esté en `src/app/core/models/` y que `CommonModule` y `FormsModule` estén importados.

## Licencia

Sin licencia definida aún.

---
