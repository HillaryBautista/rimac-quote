import { describe, it, expect, vi } from 'vitest';

// Mock de axios
const useMock = vi.fn();

const createMock = vi.fn(() => ({
    interceptors: {
        response: {
            use: useMock,
        },
    },
}));

vi.mock('axios', () => {
    return {
        default: {
            create: createMock,
        },
    };
});

describe('httpClient', () => {
    it('debe crear el cliente axios con timeout de 8000ms', async () => {
        const { httpClient } = await import('./httpClient');

        expect(createMock).toHaveBeenCalledWith({
            timeout: 8000,
        });

        expect(httpClient).toBeDefined();
    });

    it('debe registrar un interceptor de respuesta', async () => {
        await import('./httpClient');

        expect(useMock).toHaveBeenCalledTimes(1);
        expect(useMock).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function)
        );
    });

    it('debe devolver la respuesta sin modificar', async () => {
        await import('./httpClient');

        // Tomamos el primer argumento (success handler) de la primera llamada
        const [[successHandler]] = useMock.mock.calls;

        const response = { data: { ok: true } };

        const result = successHandler(response);

        expect(result).toBe(response);
    });

    it('debe propagar el error con Promise.reject', async () => {
        await import('./httpClient');

        // Tomamos el segundo argumento (error handler) de la primera llamada
        const [, errorHandler] = useMock.mock.calls[0];

        const fakeError = new Error('Network error');

        await expect(errorHandler(fakeError)).rejects.toThrow('Network error');
    });
});
