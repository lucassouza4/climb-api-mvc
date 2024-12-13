import { User } from "../../entities/user/user";

export interface UserRepository {
  save(user: User): Promise<User | Error>;
  get(email: string): Promise<User | Error>;
  update(
    name?: string,
    email?: string,
    password?: string,
  ): Promise<User | Error>;
  delete(): Promise<void | Error>;
}