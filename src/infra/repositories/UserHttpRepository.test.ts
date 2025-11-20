import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { User } from '../../domain/entities/User';

// Mock del httpClient
const getMock = vi.fn();

vi.mock('../http/httpClient', () => ({
    httpClient: {
        get: getMock,
    },
}));

// Mock de API_CONFIG
vi.mock('@core/config/api', () => ({
    API_CONFIG: {
        BASE_URL: 'https://fake-api.test',
        USER: '/api/user.json',
    },
}));

describe('UserHttpRepository', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('debe llamar al endpoint correcto', async () => {
        const fakeResponse = {
            data: {} as User,
        };

        getMock.mockResolvedValue(fakeResponse);

        const { UserHttpRepository } = await import('./UserHttpRepository');

        const repo = new UserHttpRepository();

        await repo.getUser();

        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith(
            'https://fake-api.test/api/user.json'
        );
    });

    it('debe retornar el usuario correctamente', async () => {
        const fakeUser: User = {
            name: 'Hillary',
            lastName: 'Bautista',
            birthDay: '1995-01-01',
            documentType: 'DNI',
            documentNumber: '12345678',
            phone: '999999999',
            age: 29,
        };

        getMock.mockResolvedValue({
            data: fakeUser,
        });

        const { UserHttpRepository } = await import('./UserHttpRepository');

        const repo = new UserHttpRepository();

        const result = await repo.getUser();

        expect(result).toEqual(fakeUser);
    });

    it('debe propagar el error si httpClient.get falla', async () => {
        const fakeError = new Error('Network error');

        getMock.mockRejectedValue(fakeError);

        const { UserHttpRepository } = await import('./UserHttpRepository');

        const repo = new UserHttpRepository();

        await expect(repo.getUser()).rejects.toThrow('Network error');
    });

});
