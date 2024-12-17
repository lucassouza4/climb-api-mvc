import { Boulder } from "../../../entities/boulder/boulder";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";
import {
  BoulderOutputDto,
  BoulderService,
  ListBoulderOutputDto,
} from "../boulder.service";

export class BoulderUsecaseService implements BoulderService {
  private constructor(readonly repository: BoulderRepository) {}

  public static build(repository: BoulderRepository) {
    return new BoulderUsecaseService(repository);
  }

  public async create(
    name: string,
    difficulty: number,
    sector: string,
    city: string
  ): Promise<BoulderOutputDto | Error> {
    const findedBoulder = await this.repository.get({
      name,
      city,
      sector,
      difficulty,
    });
    if (findedBoulder instanceof Boulder) {
      return new Error("Boulder já cadastrado");
    }

    const boulder = Boulder.build(name, sector, city, difficulty);
    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }

    const savedBoulder = await this.repository.save(boulder);

    if (savedBoulder instanceof Error) {
      return new Error(savedBoulder.message);
    }
    return this.presentOutput(savedBoulder);
  }

  public async list(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string
  ): Promise<ListBoulderOutputDto | Error> {
    let boulders: Boulder[] | Error;
    if (
      name === undefined &&
      difficulty === undefined &&
      sector === undefined &&
      city === undefined
    ) {
      boulders = await this.repository.getAll();
    } else {
      boulders = await this.repository.get({ name, city, sector, difficulty });
    }
    if (boulders instanceof Error) {
      return new Error(boulders.message);
    }
    return this.presentListOutput(boulders);
  }

  public async get(id: string): Promise<BoulderOutputDto | Error> {
    const boulder = await this.repository.getByID(id);

    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }

    return this.presentOutput(boulder);
  }

  public async increaseAscents(id: string): Promise<BoulderOutputDto | Error> {
    const boulder = await this.repository.getByID(id);
    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }

    boulder.incrementAscents();
    const updatedBoulder = await this.repository.update(boulder);
    if (updatedBoulder instanceof Error) {
      return new Error(updatedBoulder.message);
    }

    return this.presentOutput(updatedBoulder);
  }

  private presentOutput(boulder: Boulder): BoulderOutputDto {
    const boulderOutput: BoulderOutputDto = {
      id: boulder.id,
      name: boulder.name,
      city: boulder.city,
      sector: boulder.sector,
      difficulty: boulder.difficulty,
      ascents: boulder.ascents,
    };
    return boulderOutput;
  }

  private presentListOutput(bouldersList: Boulder[]): ListBoulderOutputDto {
    const boulderOutput: ListBoulderOutputDto = {
      boulders: bouldersList.map((element) => {
        return {
          id: element.id,
          name: element.name,
          city: element.city,
          sector: element.sector,
          difficulty: element.difficulty,
          ascents: element.ascents,
        };
      }),
    };
    return boulderOutput;
  }
}
