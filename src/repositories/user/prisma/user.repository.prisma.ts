import { PrismaClient } from "@prisma/client/extension";
import { User } from "../../../entities/user/user";
import { UserRepository } from "../user.repository";
import { Type } from "../../../util/enums/user";
import { BasicUser } from "../../../entities/user/basicUser";
import { MasterUser } from "../../../entities/user/masterUser";

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  public async save(user: User): Promise<User | Error> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          id: user.id,
          type: Type[user.type],
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });

      if (user.type == Type.BASIC) {
        return BasicUser.with(newUser.id, newUser.name, newUser.email);
      }
      return MasterUser.with(newUser.id, newUser.name, newUser.email);
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  public async get(email: string, password: string): Promise<User | Error> {
    try {
      const findedUser = await this.prisma.user.findUnique({
        where: {
          email,
          password,
        },
      });

      if (findedUser.type == Type[Type.BASIC]) {
        return BasicUser.with(findedUser.id, findedUser.name, findedUser.email);
      }
      return MasterUser.with(findedUser.id, findedUser.name, findedUser.email);
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  async getByID(id: string): Promise<User | Error> {
    try {
      const findedUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (findedUser.type == Type[Type.BASIC]) {
        return BasicUser.with(findedUser.id, findedUser.name, findedUser.email);
      }
      return MasterUser.with(findedUser.id, findedUser.name, findedUser.email);
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  update(
    name?: string,
    email?: string,
    password?: string
  ): Promise<User | Error> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }
}
