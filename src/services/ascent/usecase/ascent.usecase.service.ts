import { Ascent } from "../../../entities/ascent/ascent";
import { Boulder } from "../../../entities/boulder/boulder";
import { AscentRepository } from "../../../repositories/ascent/ascent.repository";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import {
  AscentAlreadyExistsError,
  AscentNotFoundError,
  AscentRepositoryError,
  BoulderNotFoundError,
  BoulderRepositoryError,
  InvalidAscentDataError,
  InvalidUserDataError,
  RedisError,
  UserNotFoundError,
  UserRepositoryError,
} from "../../../util/errors.util";
import { Payload } from "../../../util/jwt.util";
import { RedisService } from "../../redis/usecase/redis.usecase.service";
import { AscentService, ListAscentOutputDto } from "../ascent.service";

export class AscentUsecaseService implements AscentService {
  private constructor(
    readonly ascentRepository: AscentRepository,
    readonly userRepository: UserRepository,
    readonly boulderRepository: BoulderRepository,
    private readonly redisService: RedisService
  ) {}

  public static build(
    ascentRepository: AscentRepository,
    userRepository: UserRepository,
    boulderRepository: BoulderRepository,
    redisService: RedisService
  ) {
    return new AscentUsecaseService(
      ascentRepository,
      userRepository,
      boulderRepository,
      redisService
    );
  }

  async create(
    userId: string, // NÃO É NECESSÁRIO
    boulderId: string,
    token: Payload
  ): Promise<void | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new UserNotFoundError();
    }
    if (user.id !== token.id) {
      return new InvalidUserDataError("Usuário não corresponde ao login");
    }

    const boulder = await this.boulderRepository.getByID(boulderId);
    if (boulder instanceof Error) {
      return new BoulderNotFoundError();
    }

    const findedAscent = await this.ascentRepository.get(user.id, boulder.id);
    if (!(findedAscent instanceof Error)) {
      return new AscentAlreadyExistsError();
    }

    boulder.encreaseAscents();
    const encreasedBoulder = await this.boulderRepository.update(boulder);
    if (encreasedBoulder instanceof Error) {
      return new BoulderRepositoryError();
    }

    user.encreaseScore(encreasedBoulder.difficulty);
    const encreasedUser = await this.userRepository.update(user);
    if (encreasedUser instanceof Error) {
      // É PRECISO VOLTAR O INCREMENT DE BOULDER
      return new UserRepositoryError();
    }

    const ascent = Ascent.build(encreasedUser.id, encreasedBoulder.id);
    if (ascent instanceof Error) {
      return new InvalidAscentDataError(ascent.message);
    }

    this.updateRankingAsync(user.id, user.score);

    const savedAscent = await this.ascentRepository.save(ascent);
    if (savedAscent instanceof Error) {
      return new AscentRepositoryError();
    }

    return;
  }
  async get(
    userId: string,
    token: Payload
  ): Promise<ListAscentOutputDto | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new UserNotFoundError();
    }
    if (user.id !== token.id) {
      return new InvalidUserDataError("Usuário não corresponde ao login");
    }

    const ascents = await this.ascentRepository.getAll(userId);
    if (ascents instanceof Error) {
      return new AscentNotFoundError();
    }

    const bouldersList = ascents.map((ascent) => {
      return ascent.boulderId;
    });

    const ascentsBoulders = await this.boulderRepository.getAll(bouldersList);
    if (ascentsBoulders instanceof Error) {
      return new BoulderNotFoundError();
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
      return new UserNotFoundError();
    }

    if (user.id != token.id) {
      return new InvalidUserDataError("Usuário não correspondente ao login");
    }

    const boulder = await this.boulderRepository.getByID(boulderId);
    if (boulder instanceof Error) {
      return new BoulderNotFoundError();
    }

    const deletedAscent = await this.ascentRepository.delete(
      user.id,
      boulderId
    );
    if (deletedAscent instanceof Error) {
      return new AscentRepositoryError();
    }

    boulder.decreaseAscents();
    const decresedBoulder = await this.boulderRepository.update(boulder);
    if (decresedBoulder instanceof Error) {
      return new BoulderRepositoryError();
    }

    user.decreaseScore(decresedBoulder.difficulty);
    const decreasedUser = await this.userRepository.update(user);
    if (decreasedUser instanceof Error) {
      return new UserRepositoryError();
    }

    this.updateRankingAsync(user.id, user.score);
  }

  private async updateRankingAsync(userId: string, score: number) {
    try {
      // Atualiza o score no Redis para o usuário
      await this.redisService.set(`user:${userId}:score`, String(score));

      // Remover o usuário do ranking, se já estiver presente, para garantir que sua pontuação seja atualizada
      await this.redisService.zrem("ranking", userId);

      // Atualiza a posição do usuário no ranking
      await this.redisService.zadd("ranking", score, userId);
    } catch {
      return new RedisError(
        `Erro ao atualizar o ranking no Redis para user:${userId}`
      );
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
