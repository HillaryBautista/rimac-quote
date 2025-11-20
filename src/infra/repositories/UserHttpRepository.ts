import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { User } from "../../domain/entities/User";
import { httpClient } from "../http/httpClient";

export class UserHttpRepository implements UserRepository {
    async getUser(): Promise<User> {
        const { data } = await httpClient.get<User>(
            "https://rimac-front-end-challenge.netlify.app/api/user.json"
        );
        return data;
    }
}
