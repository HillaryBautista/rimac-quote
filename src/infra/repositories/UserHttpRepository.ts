import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { User } from "../../domain/entities/User";
import { httpClient } from "../http/httpClient";
import { API_CONFIG } from "@core/config/api";

export class UserHttpRepository implements UserRepository {
    async getUser(): Promise<User> {
        const { data } = await httpClient.get<User>(
            `${API_CONFIG.BASE_URL}${API_CONFIG.USER}`
        );
        return data;
    }
}
