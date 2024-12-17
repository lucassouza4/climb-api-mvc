import { PrismaClient } from "@prisma/client";
import { Ascent } from "../../../entities/ascent/ascent";
import { AscentRepository } from "../ascent.repository";

export class AscentRepositoryPrisma implements AscentRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static Build(prisma: PrismaClient) {
    return new AscentRepositoryPrisma(prisma);
  }
  async save(ascent: Ascent): Promise<Ascent | Error> {
    try {
      const newAscent = await this.prisma.ascent.create({
        data: {
          id: ascent.Id,
          userId: ascent.UserId,
          boulderId: ascent.BoulderId,
        },
      });

      return Ascent.With(newAscent.id, newAscent.userId, newAscent.boulderId);
    } catch (error: any) {
      return new Error(error.message);
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
      return Ascent.With(ascent.id, ascent.userId, ascent.boulderId);
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  async getAll(userId: string): Promise<Ascent[] | Error> {
    try {
      const ascents = await this.prisma.ascent.findMany({
        where: {
          userId,
        },
      });

      return ascents.map((ascent: any) => {
        return Ascent.With(ascent.id, ascent.userId, ascent.boulderId);
      });
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  update(ascent: Ascent): Promise<Ascent | Error> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }
}
