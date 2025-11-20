import type { User } from "../entities/User";
import type { UserRepository } from "../repositories/UserRepository";

export class GetUserUseCase {

    private readonly userRepo: UserRepository
    constructor(userRepo: UserRepository) { 
        this.userRepo = userRepo;
    }

    execute(): Promise<User> {
        return this.userRepo.getUser();
    }
}
