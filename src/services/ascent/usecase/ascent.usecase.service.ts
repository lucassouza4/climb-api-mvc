import { Ascent } from "../../../entities/ascent/ascent";
import { AscentRepository } from "../../../repositories/ascent/ascent.repository";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { Payload } from "../../../util/jwt.util";
import { AscentOutputDto, AscentService } from "../ascent.service";
import { ListBoulderOutputDto } from "../../boulder/boulder.service";
import { Boulder } from "../../../entities/boulder/boulder";

export class AscentUsecaseService implements AscentService {
  private constructor(
    readonly ascentRepository: AscentRepository,
    readonly userRepository: UserRepository,
    readonly boulderRepository: BoulderRepository
  ) {}

  public static Build(
    ascentRepository: AscentRepository,
    userRepository: UserRepository,
    boulderRepository: BoulderRepository
  ) {
    return new AscentUsecaseService(
      ascentRepository,
      userRepository,
      boulderRepository
    );
  }

  async Create(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<AscentOutputDto | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new Error("Usuário não encontrado");
    }
    if (user.Id !== token.id) {
      return new Error("Usuário não corresponde ao login");
    }

    const boulder = await this.boulderRepository.getByID(boulderId);
    if (boulder instanceof Error) {
      return new Error("Boulder não encontrado");
    }

    const findedAscent = await this.ascentRepository.get(user.Id, boulder.Id);
    if (!(findedAscent instanceof Error)) {
      return new Error("Ascensão já existente");
    }

    boulder.IncrementAscents();
    const incrementedBoulder = await this.boulderRepository.update(boulder);
    if (incrementedBoulder instanceof Error) {
      return new Error(incrementedBoulder.message);
    }

    const ascent = Ascent.build(user.Id, incrementedBoulder.Id);
    if (ascent instanceof Error) {
      return new Error(ascent.message);
    }

    const savedAscent = await this.ascentRepository.save(ascent);
    if (savedAscent instanceof Error) {
      return new Error(savedAscent.message);
    }

    return this.PresentOutput(savedAscent);
  }
  async Get(
    userId: string,
    token: Payload
  ): Promise<ListBoulderOutputDto | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new Error("Usuário não encontrado");
    }
    if (user.Id !== token.id) {
      return new Error("Usuário não corresponde ao login");
    }

    const ascents = await this.ascentRepository.getAll(userId);
    if (ascents instanceof Error) {
      return new Error(ascents.message);
    }

    const bouldersList = ascents.map((ascent) => {
      return ascent.BoulderId;
    });

    const ascentsBoulders = await this.boulderRepository.getAll(bouldersList);
    if (ascentsBoulders instanceof Error) {
      return new Error(ascentsBoulders.message);
    }

    return this.ListPresentOutput(ascentsBoulders);
  }
  Update(id: string, token: Payload): Promise<AscentOutputDto | Error> {
    throw new Error("Method not implemented.");
  }
  Delete(id: string, token: Payload): Promise<AscentOutputDto | Error> {
    throw new Error("Method not implemented.");
  }

  private PresentOutput(ascent: Ascent): AscentOutputDto {
    const ascentOutput: AscentOutputDto = {
      id: ascent.Id,
      userId: ascent.UserId,
      boulderId: ascent.BoulderId,
    };
    return ascentOutput;
  }

  private ListPresentOutput(boulderList: Boulder[]): ListBoulderOutputDto {
    const ascentsOutput: ListBoulderOutputDto = {
      boulders: boulderList.map((boulder) => {
        return {
          id: boulder.Id,
          name: boulder.Name,
          city: boulder.City,
          sector: boulder.Sector,
          difficulty: boulder.Difficulty,
          ascents: boulder.Ascents,
        };
      }),
    };
    return ascentsOutput;
  }
}
