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

  public async Create(
    name: string,
    difficulty: number,
    sector: string,
    city: string,
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
    return this.PresentOutput(savedBoulder);
  }

  public async List(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string,
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
    return this.PresentListOutput(boulders);
  }

  public async Get(id: string): Promise<BoulderOutputDto | Error> {
    const boulder = await this.repository.getByID(id);

    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }

    return this.PresentOutput(boulder);
  }

  public async IncreaseAscents(id: string): Promise<BoulderOutputDto | Error> {
    const boulder = await this.repository.getByID(id);
    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }

    boulder.IncrementAscents();
    const updatedBoulder = await this.repository.update(boulder);
    if (updatedBoulder instanceof Error) {
      return new Error(updatedBoulder.message);
    }

    return this.PresentOutput(updatedBoulder);
  }

  private PresentOutput(boulder: Boulder): BoulderOutputDto {
    const boulderOutput: BoulderOutputDto = {
      id: boulder.Id,
      name: boulder.Name,
      city: boulder.City,
      sector: boulder.Sector,
      difficulty: boulder.Difficulty,
      ascents: boulder.Ascents,
    };
    return boulderOutput;
  }

  private PresentListOutput(bouldersList: Boulder[]): ListBoulderOutputDto {
    const boulderOutput: ListBoulderOutputDto = {
      boulders: bouldersList.map((element) => {
        return {
          id: element.Id,
          name: element.Name,
          city: element.City,
          sector: element.Sector,
          difficulty: element.Difficulty,
          ascents: element.Ascents,
        };
      }),
    };
    return boulderOutput;
  }
}
