import { BasicUser } from "../../../entities/user/basicUser";
import { UserRepository } from "../../../repositories/user/user.repository";
import { UserOutputDto, UserService } from "../user.service";
import { User } from "../../../entities/user/user";
import jwt from "jsonwebtoken";
import { Payload } from "../../../util/jwt.util";

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
    return this.presentOutput(savedUser);
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

  async get(id: string, token: Payload): Promise<UserOutputDto | Error> {
    const user = await this.repository.getByID(id);
    if (user instanceof Error) {
      return new Error(user.message);
    }

    if (user.id != token.id) {
      return new Error("Usuário não correspondente");
    }

    return this.presentOutput(user);
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

  private presentOutput(user: User, token?: string): UserOutputDto {
    let output: UserOutputDto;
    if (token) {
      output = {
        id: user.id,
        name: user.name,
        email: user.email,
        score: user.score,
        token: token,
      };
    } else {
      output = {
        id: user.id,
        name: user.name,
        email: user.email,
        score: user.score,
      };
    }
    return output;
  }
}
