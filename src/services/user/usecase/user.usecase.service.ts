import { BasicUser } from "../../../entities/user/basicUser";
import { UserRepository } from "../../../repositories/user/user.repository";
import { UserOutputDto, UserService } from "../user.service";
import { User } from "../../../entities/user/user";
import jwt from "jsonwebtoken";

export class UserUsecaseService implements UserService {
  private constructor(readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new UserUsecaseService(repository);
  }

  public async create(
    name: string,
    email: string,
    password: string
  ): Promise<UserOutputDto | Error> {
    const findedUser = await this.repository.get(email, password);
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
    const token = "teste";
    return this.presentOutput(savedUser, token);
  }

  public async login(
    email: string,
    password: string
  ): Promise<UserOutputDto | Error> {
    const findedUser = await this.repository.get(email, password);
    if (findedUser instanceof Error) {
      return new Error("Usuário não encontrado");
    }
    const jwtSecret = process.env.JWT_TOKEN;
    if (!jwtSecret) {
      return new Error("token não definido");
    }
    const token = jwt.sign(
      {
        id: findedUser.id,
        permissions: findedUser.getPermissions(),
      },
      jwtSecret
      //{ expiresIn: 300 }
    );
    return this.presentOutput(findedUser, token);
  }

  update(
    name?: string,
    email?: string,
    password?: string
  ): Promise<UserOutputDto | Error> {
    throw new Error("Method not implemented.");
  }

  delete(email: string): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }

  private presentOutput(user: User, token: string): UserOutputDto {
    const output: UserOutputDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      score: user.score,
      token: token,
    };
    return output;
  }
}
