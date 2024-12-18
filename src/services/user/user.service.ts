import { Payload } from "../../util/jwt.util";

export type UserOutputDto = {
  id: string;
  name: string;
  email: string;
  score: number;
  token?: string;
};

export interface UserService {
  create(
    name: string,
    email: string,
    password: string
  ): Promise<UserOutputDto | Error>;
  login(email: string, password: string): Promise<UserOutputDto | Error>;
  get(id: string, token: Payload): Promise<UserOutputDto | Error>;
  update(
    name?: string,
    email?: string,
    password?: string
  ): Promise<UserOutputDto | Error>;
  delete(email: string): Promise<void | Error>;
}
