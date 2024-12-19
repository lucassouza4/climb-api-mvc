import { Ascent } from "../../../entities/ascent/ascent";
import { Boulder } from "../../../entities/boulder/boulder";
import { AscentRepository } from "../../../repositories/ascent/ascent.repository";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { Payload } from "../../../util/jwt.util";
import { AscentService, ListAscentOutputDto } from "../ascent.service";

export class AscentUsecaseService implements AscentService {
  private constructor(
    readonly ascentRepository: AscentRepository,
    readonly userRepository: UserRepository,
    readonly boulderRepository: BoulderRepository
  ) {}

  public static build(
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

  async create(
    userId: string, // NÃO É NECESSÁRIO
    boulderId: string,
    token: Payload
  ): Promise<void | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new Error("Usuário não encontrado");
    }
    if (user.id !== token.id) {
      return new Error("Usuário não corresponde ao login");
    }

    const boulder = await this.boulderRepository.getByID(boulderId);
    if (boulder instanceof Error) {
      return new Error("Boulder não encontrado");
    }

    const findedAscent = await this.ascentRepository.get(user.id, boulder.id);
    if (!(findedAscent instanceof Error)) {
      return new Error("Ascensão já existente");
    }

    boulder.encreaseAscents();
    const encreasedBoulder = await this.boulderRepository.update(boulder);
    if (encreasedBoulder instanceof Error) {
      return new Error(encreasedBoulder.message);
    }

    user.encreaseScore(encreasedBoulder.difficulty);
    const encreasedUser = await this.userRepository.update(user);
    if (encreasedUser instanceof Error) {
      // É PRECISO VOLTAR O INCREMENT DE BOULDER
      return new Error(encreasedUser.message);
    }

    const ascent = Ascent.build(encreasedUser.id, encreasedBoulder.id);
    if (ascent instanceof Error) {
      return new Error(ascent.message);
    }

    const savedAscent = await this.ascentRepository.save(ascent);
    if (savedAscent instanceof Error) {
      return new Error(savedAscent.message);
    }

    return;
  }
  async get(
    userId: string,
    token: Payload
  ): Promise<ListAscentOutputDto | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new Error("Usuário não encontrado");
    }
    if (user.id !== token.id) {
      return new Error("Usuário não corresponde ao login");
    }

    const ascents = await this.ascentRepository.getAll(userId);
    if (ascents instanceof Error) {
      return new Error(ascents.message);
    }

    const bouldersList = ascents.map((ascent) => {
      return ascent.boulderId;
    });

    const ascentsBoulders = await this.boulderRepository.getAll(bouldersList);
    if (ascentsBoulders instanceof Error) {
      return new Error(ascentsBoulders.message);
    }

    return this.listPresentOutput(ascentsBoulders);
  }

  async delete(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<void | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new Error(user.message);
    }

    if (user.id != token.id) {
      return new Error("Usuário não correspondente");
    }

    const boulder = await this.boulderRepository.getByID(boulderId);
    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }

    const deletedAscent = await this.ascentRepository.delete(
      user.id,
      boulderId
    );
    if (deletedAscent instanceof Error) {
      return new Error(deletedAscent.message);
    }

    boulder.decreaseAscents();
    const decresedBoulder = await this.boulderRepository.update(boulder);
    if (decresedBoulder instanceof Error) {
      return new Error(decresedBoulder.message);
    }

    user.decreaseScore(decresedBoulder.difficulty);
    const decreasedUser = await this.userRepository.update(user);
    if (decreasedUser instanceof Error) {
      return new Error(decreasedUser.message);
    }
  }
  private listPresentOutput(boulderList: Boulder[]): ListAscentOutputDto {
    const ascentsOutput: ListAscentOutputDto = {
      boulders: boulderList.map((boulder) => {
        return {
          id: boulder.id,
          name: boulder.name,
          city: boulder.city,
          sector: boulder.sector,
          difficulty: boulder.difficulty,
          ascents: boulder.ascents,
        };
      }),
    };
    return ascentsOutput;
  }
}
