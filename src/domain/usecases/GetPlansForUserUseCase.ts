import type { Plan } from "../entities/Plan";
import type { PlanRepository } from "../repositories/PlanRepository";

type Params = {
  age: number;
  forSomeoneElse: boolean;
};

export class GetPlansForUserUseCase {
  private readonly planRepo: PlanRepository;
  constructor(planRepo: PlanRepository) {
    this.planRepo = planRepo;
  }

  async execute(): Promise<Plan[]> {
    const allPlans = await this.planRepo.getPlans();

    // Ejemplo de filtro por edad (ajústalo si quieres otra lógica)
    /* const filtered = allPlans.filter((plan) => age <= plan.age);

    if (forSomeoneElse) {
      return filtered.map((plan) => ({
        ...plan,
        originalPrice: plan.price,
        price: Number((plan.price * 0.95).toFixed(2)),
      }));
    } */

    return allPlans;
  }
}
