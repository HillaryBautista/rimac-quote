import type { Plan } from "../entities/Plan";

export interface PlanRepository {
  getPlans(): Promise<Plan[]>;
}
