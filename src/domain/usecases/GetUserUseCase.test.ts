import { describe, it, expect, vi } from 'vitest';
import { GetUserUseCase } from './GetUserUseCase';
import type { User } from '../entities/User';
import type { UserRepository } from '../repositories/UserRepository';

describe('GetUserUseCase', () => {

    it('debe retornar el usuario que provee el repositorio', async () => {

        const mockUser: User = {
            name: 'Hillary',
            lastName: 'Bautista',
            birthDay: '1995-01-01',
            documentType: 'DNI',
            documentNumber: '12345678',
            phone: '999999999',
            age: 29
        };

        const mockRepo: UserRepository = {
            getUser: vi.fn().mockResolvedValue(mockUser),
        };

        const useCase = new GetUserUseCase(mockRepo);

        const result = await useCase.execute();

        expect(mockRepo.getUser).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUser);

    });

    it('debe propagar error si el repositorio falla', async () => {

        const error = new Error('Error obteniendo usuario');

        const mockRepo: UserRepository = {
            getUser: vi.fn().mockRejectedValue(error),
        };

        const useCase = new GetUserUseCase(mockRepo);

        await expect(useCase.execute()).rejects.toThrow('Error obteniendo usuario');
        expect(mockRepo.getUser).toHaveBeenCalledTimes(1);

    });

});
