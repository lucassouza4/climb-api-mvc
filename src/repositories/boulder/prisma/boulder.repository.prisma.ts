import { PrismaClient } from "@prisma/client/extension";
import { Boulder, BoulderProps } from "../../../entities/boulder/boulder";
import { BoulderRepository } from "../boulder.repository";

export class BoulderRepositoryPrisma implements BoulderRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new BoulderRepositoryPrisma(prisma);
  }

  public async save(boulder: Boulder): Promise<Boulder | Error> {
    try {
      const newBoulder = await this.prisma.boulder.create({
        data: {
          name: boulder.name,
          ascents: boulder.ascents,
          city: boulder.city,
          difficulty: boulder.difficulty,
          sector: boulder.sector,
          id: boulder.id,
        },
      });

      return Boulder.with(
        newBoulder.id,
        newBoulder.name,
        newBoulder.city,
        newBoulder.sector,
        newBoulder.difficulty,
        newBoulder.ascents
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  public async getByID(id: string): Promise<Boulder | Error> {
    try {
      const boulder = await this.prisma.boulder.findUnique({
        where: {
          id,
        },
      });

      return Boulder.with(
        boulder.id,
        boulder.name,
        boulder.city,
        boulder.sector,
        boulder.difficulty,
        boulder.ascents
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  public async get(query: {
    name?: string;
    city?: string;
    sector?: string;
    difficulty?: number;
  }): Promise<Boulder[] | Error> {
    try {
      const boulders = await this.prisma.boulder.findMany({
        where: {
          name: query.name?.toUpperCase(),
          city: query.city?.toUpperCase(),
          sector: query.sector?.toUpperCase(),
          difficulty: query.difficulty,
        },
        orderBy: {
          ascents: "desc",
        },
      });

      return boulders.map((element: BoulderProps) => {
        return Boulder.with(
          element.id,
          element.name,
          element.city,
          element.sector,
          element.difficulty,
          element.ascents
        );
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  public async getAll(ids?: string[]): Promise<Boulder[] | Error> {
    // pagination
    try {
      const boulders = await this.prisma.boulder.findMany({
        where: {
          id: { in: ids },
        },
        orderBy: {
          ascents: "desc",
        },
      });

      return boulders.map((element: BoulderProps) => {
        return Boulder.with(
          element.id,
          element.name,
          element.city,
          element.sector,
          element.difficulty,
          element.ascents
        );
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  public async update(boulder: Boulder): Promise<Boulder | Error> {
    try {
      const updatedBoulder = await this.prisma.boulder.update({
        where: { id: boulder.id },
        data: {
          name: boulder.name,
          city: boulder.city,
          sector: boulder.sector,
          difficulty: boulder.difficulty,
          ascents: boulder.ascents,
        },
      });
      return Boulder.with(
        updatedBoulder.id,
        updatedBoulder.name,
        updatedBoulder.city,
        updatedBoulder.sector,
        updatedBoulder.difficulty,
        updatedBoulder.ascents
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
  public async delete(id: string): Promise<void | Error> {
    try {
      await this.prisma.boulder.delete({
        where: { id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
}
