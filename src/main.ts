import { ApiExpress } from "./api/express/api.express";
import { AscentController } from "./api/express/controllers/ascent.controller";
import { BoulderController } from "./api/express/controllers/boulder.controller";
import { FriendshipController } from "./api/express/controllers/friendship.controller";
import { RankingController } from "./api/express/controllers/ranking.controller";
import { UserController } from "./api/express/controllers/user.controller";
import createRedisClient from "./redis";
import { AscentRepositoryPrisma } from "./repositories/ascent/prisma/ascent.repository.prisma";
import { BoulderRepositoryPrisma } from "./repositories/boulder/prisma/boulder.repository.prisma";
import { FriendshipRepositoryPrisma } from "./repositories/friendship/prisma/friendship.repository.prisma";
import { UserRepositoryPrisma } from "./repositories/user/prisma/user.repository.prisma";
import { AscentUsecaseService } from "./services/ascent/usecase/ascent.usecase.service";
import { BoulderUsecaseService } from "./services/boulder/usecase/boulder.usecase.service";
import { FriendshipUsecaseService } from "./services/friendship/usecase/friendship.usecase.service";
import { RankingUsecaseService } from "./services/ranking/usecase/ranking.service.usecase";
import { RedisService } from "./services/redis/usecase/redis.usecase.service";
import { UserUsecaseService } from "./services/user/usecase/user.usecase.service";
import { prisma } from "./util/prisma.util";

function main() {
  const apiExpress = ApiExpress.build();

  const redisClient = createRedisClient();
  const redisService = new RedisService(redisClient);

  const boulderRepository = BoulderRepositoryPrisma.build(prisma);
  const boulderService = BoulderUsecaseService.build(boulderRepository);
  const boulderController = BoulderController.build(boulderService);

  const userRepository = UserRepositoryPrisma.build(prisma);
  const userService = UserUsecaseService.build(userRepository, redisService);
  const userController = UserController.build(userService);

  const ascentRepository = AscentRepositoryPrisma.build(prisma);
  const ascentService = AscentUsecaseService.build(
    ascentRepository,
    userRepository,
    boulderRepository,
    redisService
  );
  const ascentController = AscentController.build(ascentService);

  const friendshipRepository = FriendshipRepositoryPrisma.build(prisma);
  const friendshipService = FriendshipUsecaseService.build(
    friendshipRepository,
    userRepository
  );
  const friendshipController = FriendshipController.build(friendshipService);

  const rankingService = RankingUsecaseService.build(
    userRepository,
    redisService
  );
  const rankingController = RankingController.build(rankingService);

  apiExpress.addPostRoute("/login", userController.login.bind(userController));
  apiExpress.addPostRoute(
    "/boulders/create",
    boulderController.create.bind(boulderController)
  );
  apiExpress.addPostRoute(
    "/ascents/create",
    ascentController.create.bind(ascentController)
  );
  apiExpress.addPostRoute(
    "/users/create",
    userController.create.bind(userController)
  );
  apiExpress.addPostRoute(
    "/friendship/create",
    friendshipController.create.bind(friendshipController)
  );
  apiExpress.addGetRoute(
    "/friendships",
    friendshipController.get.bind(friendshipController)
  );
  apiExpress.addGetRoute(
    "/boulders",
    boulderController.get.bind(boulderController)
  );
  apiExpress.addGetRoute("/user", userController.get.bind(userController));
  apiExpress.addGetRoute(
    "/ascents",
    ascentController.get.bind(ascentController)
  );
  apiExpress.addGetRoute(
    "/ranking",
    rankingController.get.bind(rankingController)
  );
  apiExpress.addPatchRoute(
    "/friendships",
    friendshipController.update.bind(friendshipController)
  );
  apiExpress.addDeleteRoute(
    "/friendships",
    friendshipController.delete.bind(friendshipController)
  );
  apiExpress.addDeleteRoute(
    "/ascents",
    ascentController.delete.bind(ascentController)
  );
  const port = Number(process.env.PORT) || 8000;
  apiExpress.start(port);
}

main();
