import { describe, it, expect, vi } from 'vitest';
import { GetPlansForUserUseCase } from './GetPlansForUserUseCase';
import type { Plan } from '../entities/Plan';
import type { PlanRepository } from '../repositories/PlanRepository';

describe('GetPlansForUserUseCase', () => {
    it('debe retornar los planes que entrega el repositorio', async () => {
        const mockPlans: Plan[] = [
            {
                name: 'Plan A',
                price: 100,
                description: ['desc'],
                age: 20,
                ageLimit: 60,
                recommended: true,
            },
        ];

        const mockRepo: PlanRepository = {
            getPlans: vi.fn().mockResolvedValue(mockPlans),
        };

        const useCase = new GetPlansForUserUseCase(mockRepo);
        const result = await useCase.execute();

        expect(mockRepo.getPlans).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockPlans);
    });
});
