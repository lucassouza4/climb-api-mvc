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
          score: user.score,
        },
      });

      if (user.type == Type.BASIC) {
        return BasicUser.with(
          newUser.id,
          newUser.name,
          newUser.email,
          newUser.score
        );
      }
      return MasterUser.with(
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.score
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  public async get(email: string): Promise<User | Error> {
    try {
      const findedUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (findedUser.type == Type[Type.BASIC]) {
        return BasicUser.with(
          findedUser.id,
          findedUser.name,
          findedUser.email,
          findedUser.score,
          findedUser.rank,
          findedUser.password
        );
      }
      return MasterUser.with(
        findedUser.id,
        findedUser.name,
        findedUser.email,
        findedUser.score,
        findedUser.rank,
        findedUser.password
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
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
        return BasicUser.with(
          findedUser.id,
          findedUser.name,
          findedUser.email,
          findedUser.score,
          findedUser.rank
        );
      }
      return MasterUser.with(
        findedUser.id,
        findedUser.name,
        findedUser.email,
        findedUser.score,
        findedUser.rank
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  async update(user: User): Promise<User | Error> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          type: Type[user.type],
          name: user.name,
          email: user.email,
          score: user.score,
        },
      });
      if (updatedUser.type == Type[Type.BASIC]) {
        return BasicUser.with(
          updatedUser.id,
          updatedUser.name,
          updatedUser.email,
          updatedUser.score,
          updatedUser.rank
        );
      }
      return MasterUser.with(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.score,
        updatedUser.rank
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  async updateRank(userId: string, rank: number): Promise<void | Error> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          rank,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  delete(): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }

  async getAll(ids?: string[]): Promise<User[] | Error> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          id: { in: ids },
        },
      });
      return users.map((user: User) => {
        if (user.type.toString() == Type[Type.BASIC]) {
          return BasicUser.with(
            user.id,
            user.name,
            user.email,
            user.score,
            user.rank
          );
        }
        return MasterUser.with(
          user.id,
          user.name,
          user.email,
          user.score,
          user.rank
        );
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
}
