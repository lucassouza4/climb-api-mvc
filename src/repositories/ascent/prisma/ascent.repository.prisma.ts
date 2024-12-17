import { PrismaClient, Ascent as PrismaAscent } from "@prisma/client";
import { Ascent } from "../../../entities/ascent/ascent";
import { AscentRepository } from "../ascent.repository";

export class AscentRepositoryPrisma implements AscentRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AscentRepositoryPrisma(prisma);
  }

  async save(ascent: Ascent): Promise<Ascent | Error> {
    try {
      const newAscent = await this.prisma.ascent.create({
        data: {
          id: ascent.id,
          userId: ascent.userId,
          boulderId: ascent.boulderId,
        },
      });

      return Ascent.with(newAscent.id, newAscent.userId, newAscent.boulderId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  getById(id: string): Promise<Ascent | Error> {
    throw new Error("Method not implemented.");
  }

  async get(userId: string, boulderId: string): Promise<Ascent | Error> {
    try {
      const ascent = await this.prisma.ascent.findFirstOrThrow({
        where: {
          userId,
          boulderId,
        },
      });
      return Ascent.with(ascent.id, ascent.userId, ascent.boulderId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  async getAll(userId: string): Promise<Ascent[] | Error> {
    try {
      const ascents: PrismaAscent[] = await this.prisma.ascent.findMany({
        where: {
          userId,
        },
      });

      return ascents.map((ascent) => {
        return Ascent.with(ascent.id, ascent.userId, ascent.boulderId);
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  update(ascent: Ascent): Promise<Ascent | Error> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }
}
