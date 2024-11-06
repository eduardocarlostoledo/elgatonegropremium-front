// import axios from 'axios';

// // Crear una instancia de Axios
// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_APP_BACK, // URL base de tu backend
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   // Tiempo de espera para prevenir solicitudes de larga duración
//   timeout: 5000,
//   // Solo permitir solicitudes desde HTTPS en producción
//   httpsAgent: process.env.NODE_ENV === 'production' ? new https.Agent({ rejectUnauthorized: true }) : null,
// });

// // Interceptor para incluir el token en todas las solicitudes
// axiosClient.interceptors.request.use(
//   (config) => {
//     // Obtener el token de sessionStorage en lugar de localStorage
//     const token = sessionStorage.getItem('token');

//     // Si existe el token, agregarlo al encabezado de autorización
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Limitar el tipo de contenido aceptado para evitar respuestas maliciosas
//     config.headers.Accept = 'application/json';

//     return config;
//   },
//   (error) => {
//     // Manejar el error de la solicitud
//     return Promise.reject(error);
//   }
// );

// // Interceptor para manejar respuestas y errores
// axiosClient.interceptors.response.use(
//   (response) => {
//     // Procesar la respuesta exitosa
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       const status = error.response.status;

//       // Manejar errores específicos
//       if (status === 401) {
//         // No autorizado, redirigir al usuario al login
//         console.error("No autorizado, redirigiendo al login...");
//         window.location.href = '/login'; // Redireccionar según tu ruta de login
//       } else if (status === 403) {
//         console.warn("Acceso prohibido.");
//         // Aquí podrías realizar una acción adicional o redirigir a otra página
//       } else if (status === 500) {
//         console.error("Error del servidor, por favor intenta más tarde.");
//         // Redireccionar o mostrar una alerta amigable al usuario
//       }
//     } else if (error.code === 'ECONNABORTED') {
//       console.error("Tiempo de espera excedido para la solicitud.");
//     } else {
//       console.error("Error de red, por favor revisa tu conexión.");
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;

import axios from 'axios';

// Crear una instancia de Axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BACK, // URL base de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token en todas las solicitudes
axiosClient.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Si existe el token, agregarlo al encabezado de autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Manejar el error de la solicitud
    return Promise.reject(error);
  }
);

// Opcional: Interceptor para manejar respuestas y errores
axiosClient.interceptors.response.use(
  (response) => {
    // Procesar la respuesta exitosa
    return response;
  },
  (error) => {
    // Manejar errores como respuestas no autorizadas (401)
    if (error.response && error.response.status === 401) {
      // Redireccionar al usuario a la página de login o manejar el error
      console.error("No autorizado, redirigiendo al login...");
      // Puedes redirigir al login usando `window.location.href` o cualquier otra lógica
    }

    return Promise.reject(error);
  }
);

export default axiosClient