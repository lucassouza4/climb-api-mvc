import { BasicUser } from "../../../entities/user/basicUser";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ListUserOutputDto, UserOutputDto, UserService } from "../user.service";
import { User } from "../../../entities/user/user";
import jwt from "jsonwebtoken";
import { Payload } from "../../../util/jwt.util";
import { RedisService } from "../../redis/usecase/redis.usecase.service";
import { Type } from "../../../util/enums/user";
import { MasterUser } from "../../../entities/user/masterUser";
import {
  InvalidTokenError,
  InvalidUserDataError,
  UserAlreadyExistsError,
  UserNotFoundError,
  UserRepositoryError,
} from "../../../util/errors.util";

export class UserUsecaseService implements UserService {
  private constructor(
    readonly repository: UserRepository,
    private readonly redisService: RedisService
  ) {}

  public static build(repository: UserRepository, redisService: RedisService) {
    return new UserUsecaseService(repository, redisService);
  }

  public async create(
    name: string,
    email: string,
    password: string
  ): Promise<UserOutputDto | Error> {
    const findedUser = await this.repository.get(email, password);
    if (findedUser instanceof User) {
      return new UserAlreadyExistsError();
    }
    const user = BasicUser.build(name, email, password);
    if (user instanceof Error) {
      return new InvalidUserDataError();
    }

    const savedUser = await this.repository.save(user);
    if (savedUser instanceof Error) {
      return new UserRepositoryError("Não foi possível salvar o usuário");
    }
    return this.presentOutput(savedUser);
  }

  public async login(
    email: string,
    password: string
  ): Promise<UserOutputDto | Error> {
    const findedUser = await this.repository.get(email, password);
    if (findedUser instanceof Error) {
      return new UserNotFoundError();
    }
    const jwtSecret = process.env.JWT_TOKEN;
    if (!jwtSecret) {
      return new InvalidTokenError();
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
      return new UserNotFoundError();
    }

    if (user.id != token.id) {
      return new InvalidUserDataError("Usuário não correspondente ao login");
    }

    const rank = await this.redisService.getRank("ranking", user.id);
    if (rank) {
      let userRanked: User;
      if (user.type === Type.BASIC) {
        userRanked = BasicUser.with(
          user.id,
          user.name,
          user.email,
          user.score,
          rank
        );
      } else {
        userRanked = MasterUser.with(
          user.id,
          user.name,
          user.email,
          user.score,
          rank
        );
      }
      return this.presentOutput(userRanked);
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

  async list(ids?: string[]): Promise<ListUserOutputDto | Error> {
    const users = await this.repository.getAll(ids);
    if (users instanceof Error) {
      return new UserNotFoundError();
    }
    const usersId = users.map((user) => user.id);
    const rank = await this.redisService.getRanksForMembers("ranking", usersId);
    if (rank) {
      const usersRanked: User[] = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].type === Type.BASIC) {
          usersRanked.push(
            BasicUser.with(
              users[i].id,
              users[i].name,
              users[i].email,
              users[i].score,
              rank.get(users[i].id)
            )
          );
        } else {
          usersRanked.push(
            MasterUser.with(
              users[i].id,
              users[i].name,
              users[i].email,
              users[i].score,
              rank.get(users[i].id)
            )
          );
        }
      }
      return this.presentListOutput(usersRanked);
    }

    return this.presentListOutput(users);
  }

  private presentListOutput(userList: User[]): ListUserOutputDto {
    const output: ListUserOutputDto = {
      users: userList.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type,
          score: user.score,
          rank: user.rank,
        };
      }),
    };
    return output;
  }

  private presentOutput(user: User, token?: string): UserOutputDto {
    let output: UserOutputDto;
    if (token) {
      output = {
        id: user.id,
        name: user.name,
        email: user.email,
        score: user.score,
        type: user.type,
        rank: user.rank,
        token: token,
      };
    } else {
      output = {
        id: user.id,
        name: user.name,
        email: user.email,
        score: user.score,
        type: user.type,
        rank: user.rank,
      };
    }
    return output;
  }
}
