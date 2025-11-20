import axios from "axios";

export const httpClient = axios.create({
    timeout: 8000,
});

// Interceptor 
httpClient.interceptors.response.use(
    (response:any) => response,
    (error:any) => {
        // Etiquetar logs, Sentry, etc.
        return Promise.reject(error);
    }
);
