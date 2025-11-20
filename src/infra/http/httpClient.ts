import axios from "axios";

export const httpClient = axios.create({
    timeout: 8000,
});

// Ejemplo: interceptor de logging / métricas
httpClient.interceptors.response.use(
    (response:any) => response,
    (error:any) => {
        // aquí podrías etiquetar logs, Sentry, etc.
        return Promise.reject(error);
    }
);
