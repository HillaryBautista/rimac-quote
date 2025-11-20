import type { Plan } from "../entities/Plan";
import type { PlanRepository } from "../repositories/PlanRepository";

interface Params {
    age: number;
    forSomeoneElse: boolean;
}

export class GetPlansForUserUseCase {
    private readonly planRepo: PlanRepository;
    constructor(planRepo: PlanRepository) {
        this.planRepo = planRepo;
    }

    async execute({ age, forSomeoneElse }: Params): Promise<Plan[]> {
        const plans = await this.planRepo.getPlans();

        let filtered = plans.filter((plan) => age <= plan.ageLimit);

        if (forSomeoneElse) {
            filtered = filtered.map((plan) => ({
                ...plan,
                price: plan.price * 0.95, // 5% descuento
            }));
        }

        return filtered;
    }
}
