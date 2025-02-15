import { User } from "../../entities/user/user";

export interface UserRepository {
  save(user: User): Promise<User | Error>;
  get(email: string): Promise<User | Error>;
  getByID(id: string): Promise<User | Error>;
  update(user: User): Promise<User | Error>;
  delete(): Promise<void | Error>;
  getAll(ids?: string[]): Promise<User[] | Error>;
}
