import type { PlanRepository } from "../../domain/repositories/PlanRepository";
import type { Plan } from "../../domain/entities/Plan";
import { httpClient } from "../http/httpClient";

export class PlanHttpRepository implements PlanRepository {
    async getPlans(): Promise<Plan[]> {
        const { data } = await httpClient.get<Plan[]>(
            "https://rimac-front-end-challenge.netlify.app/api/plans.json"
        );
        return data;
    }
}
