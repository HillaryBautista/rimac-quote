import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Plan } from '../../domain/entities/Plan';

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
        PLANS: '/api/plans.json',
    },
}));

describe('PlanHttpRepository', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('debe llamar al endpoint correcto', async () => {
        const fakeResponse = {
            data: {
                list: [],
            },
        };

        getMock.mockResolvedValue(fakeResponse);

        const { PlanHttpRepository } = await import('./PlanHttpRepository');

        const repo = new PlanHttpRepository();

        await repo.getPlans();

        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith(
            'https://fake-api.test/api/plans.json'
        );
    });

    it('debe retornar la lista de planes correctamente', async () => {
        const fakePlans: Plan[] = [
            {
                name: 'Plan Test',
                price: 100,
                description: ['Test'],
                age: 20,
                ageLimit: 60,
                recommended: true,
            },
        ];

        getMock.mockResolvedValue({
            data: {
                list: fakePlans,
            },
        });

        const { PlanHttpRepository } = await import('./PlanHttpRepository');

        const repo = new PlanHttpRepository();

        const result = await repo.getPlans();

        expect(result).toEqual(fakePlans);
    });

    it('debe lanzar error si httpClient.get falla', async () => {
        const fakeError = new Error('Network error');

        getMock.mockRejectedValue(fakeError);

        const { PlanHttpRepository } = await import('./PlanHttpRepository');

        const repo = new PlanHttpRepository();

        await expect(repo.getPlans()).rejects.toThrow('Network error');
    });

});
