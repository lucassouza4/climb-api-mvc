import { BasicUser } from "../../../entities/user/basicUser";
import { UserRepository } from "../../../repositories/user/user.repository";
import { UserOutputDto, UserService } from "../user.service";
import { User } from "../../../entities/user/user";

export class UserUsecaseService implements UserService {
  private constructor(readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new UserUsecaseService(repository);
  }

  public async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserOutputDto | Error> {
    const findedUser = await this.repository.get(email);
    if (findedUser instanceof User) {
      return new Error("Usuário já cadastrado");
    }
    const user = BasicUser.build(name, email, password);
    if (user instanceof Error) {
      return new Error("Não foi possível criar usuário");
    }

    const savedUser = await this.repository.save(user);
    if (savedUser instanceof Error) {
      return new Error("Não foi possível salvar o usuário");
    }

    return this.presentOutput(savedUser);
  }

  public async get(email: string): Promise<UserOutputDto | Error> {
    const findedUser = await this.repository.get(email);
    if (findedUser instanceof Error) {
      return new Error("Usuário não encontrado");
    }

    return this.presentOutput(findedUser);
  }

  update(
    name?: string,
    email?: string,
    password?: string,
  ): Promise<UserOutputDto | Error> {
    throw new Error("Method not implemented.");
  }

  delete(email: string): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }

  private presentOutput(user: User): UserOutputDto {
    const output: UserOutputDto = {
      id: user.Id,
      name: user.Name,
      email: user.Email,
      permissions: user.getPermissions(),
    };
    return output;
  }
}
