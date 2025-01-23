import { User } from "../../../entities/user/user";
import { UserRepository } from "../../../repositories/user/user.repository";
import { UserNotFoundError } from "../../../util/errors.util";
import { RedisService } from "../../redis/usecase/redis.usecase.service";
import { RankingOutputDto, RankingService } from "../ranking.service";

export class RankingUsecaseService implements RankingService {
  private constructor(
    readonly userRepository: UserRepository,
    private readonly redisService: RedisService
  ) {}

  public static build(
    userRepository: UserRepository,
    redisService: RedisService
  ) {
    return new RankingUsecaseService(userRepository, redisService);
  }

  async get(): Promise<RankingOutputDto | Error> {
    const rank = await this.redisService.zrevrange(
      "ranking",
      0,
      9,
      "WITHSCORES"
    );
    const rankId: string[] = [];
    for (let i = 0; i < rank.length; i += 2) {
      rankId.push(rank[i]);
    }

    const users = await this.userRepository.getAll(rankId);
    if (users instanceof Error) {
      return new UserNotFoundError();
    }

    users.sort((a, b) => b.score - a.score);

    return this.presentOutput(users);
  }

  private presentOutput(users: User[]): RankingOutputDto {
    const rank: RankingOutputDto = {
      ranking: users.map((user) => {
        return { id: user.id, name: user.name, score: user.score };
      }),
    };
    return rank;
  }
}
