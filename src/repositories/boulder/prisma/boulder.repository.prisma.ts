import { PrismaClient } from "@prisma/client/extension";
import { Boulder } from "../../../entities/boulder";
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
          name: boulder.Name,
          ascents: boulder.Ascents,
          city: boulder.City,
          difficulty: boulder.Difficulty,
          sector: boulder.Sector,
          id: boulder.Id,
        },
      });

      return Boulder.With(
        newBoulder.id,
        newBoulder.name,
        newBoulder.difficulty,
        newBoulder.sector,
        newBoulder.city,
        newBoulder.ascents,
      );
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  public async getByID(id: string): Promise<Boulder | Error> {
    try {
      const boulder = await this.prisma.boulder.findUnique({
        where: {
          id,
        },
      });

      return Boulder.With(
        boulder.id,
        boulder.name,
        boulder.difficulty,
        boulder.sector,
        boulder.city,
        boulder.ascents,
      );
    } catch (error: any) {
      return new Error(error.message);
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

      return boulders.map((element: any) => {
        return Boulder.With(
          element.id,
          element.name,
          element.difficulty,
          element.sector,
          element.city,
          element.ascents,
        );
      });
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  public async getAll(): Promise<Boulder[] | Error> {
    // pagination
    try {
      const boulders = await this.prisma.boulder.findMany({
        orderBy: {
          ascents: "desc",
        },
      });

      return boulders.map((element: any) => {
        return Boulder.With(
          element.id,
          element.name,
          element.difficulty,
          element.sector,
          element.city,
          element.ascents,
        );
      });
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  public async update(boulder: Boulder): Promise<Boulder | Error> {
    try {
      const updatedBoulder = await this.prisma.boulder.update({
        where: { id: boulder.Id },
        data: {
          name: boulder.Name,
          city: boulder.City,
          sector: boulder.Sector,
          difficulty: boulder.Difficulty,
          ascents: boulder.Ascents,
        },
      });
      return Boulder.With(
        updatedBoulder.id,
        updatedBoulder.name,
        updatedBoulder.difficulty,
        updatedBoulder.sector,
        updatedBoulder.city,
        updatedBoulder.ascents,
      );
    } catch (error: any) {
      return new Error(error.message);
    }
  }
  public async delete(id: string): Promise<void | Error> {
    try {
      await this.prisma.boulder.delete({
        where: { id },
      });
    } catch (error: any) {
      return new Error(error.message);
    }
  }
}
