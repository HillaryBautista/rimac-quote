import type { Plan } from "../entities/Plan";
import type { PlanRepository } from "../repositories/PlanRepository";

export class GetPlansForUserUseCase {
  private readonly planRepo: PlanRepository;
  constructor(planRepo: PlanRepository) {
    this.planRepo = planRepo;
  }

  async execute(): Promise<Plan[]> {
    const allPlans = await this.planRepo.getPlans();
    return allPlans;
    //return allPlans.map((plan, index) => ({
    //  ...plan,
    //  recommended: index === 1
    //}));
  }
}
