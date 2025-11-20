import type { PlanRepository } from "../../domain/repositories/PlanRepository";
import type { Plan } from "../../domain/entities/Plan";
import { httpClient } from "../http/httpClient";
import { API_CONFIG } from "@core/config/api";

type PlansApiResponse = {
  list: Plan[];
};

export class PlanHttpRepository implements PlanRepository {
  async getPlans(): Promise<Plan[]> {
    const { data } = await httpClient.get<PlansApiResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.PLANS}`
    );

    return data.list;
  }
}
