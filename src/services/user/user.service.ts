import { Permissions } from "../../util/enums/user";

export type UserOutputDto = {
  id: string;
  name: string;
  email: string;
  permissions: Permissions[];
};

export interface UserService {
  create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserOutputDto | Error>;
  get(email: string): Promise<UserOutputDto | Error>;
  update(
    name?: string,
    email?: string,
    password?: string,
  ): Promise<UserOutputDto | Error>;
  delete(email: string): Promise<void | Error>;
}
