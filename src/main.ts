import { ApiExpress } from "./api/express/api.express";
import { AscentController } from "./api/express/controllers/ascent.controller";
import { BoulderController } from "./api/express/controllers/boulder.controller";
import { UserController } from "./api/express/controllers/user.controller";
import { AscentRepositoryPrisma } from "./repositories/ascent/prisma/ascent.repository.prisma";
import { BoulderRepositoryPrisma } from "./repositories/boulder/prisma/boulder.repository.prisma";
import { UserRepositoryPrisma } from "./repositories/user/prisma/user.repository.prisma";
import { AscentUsecaseService } from "./services/ascent/usecase/ascent.usecase.service";
import { BoulderUsecaseService } from "./services/boulder/usecase/boulder.usecase.service";
import { UserUsecaseService } from "./services/user/usecase/user.usecase.service";
import { prisma } from "./util/prisma.util";

function main() {
  const apiExpress = ApiExpress.build();

  const boulderRepository = BoulderRepositoryPrisma.build(prisma);
  const boulderService = BoulderUsecaseService.build(boulderRepository);
  const boulderController = BoulderController.build(boulderService);

  const userRepository = UserRepositoryPrisma.build(prisma);
  const userService = UserUsecaseService.build(userRepository);
  const userController = UserController.build(userService);

  const ascentRepository = AscentRepositoryPrisma.build(prisma);
  const ascentService = AscentUsecaseService.build(
    ascentRepository,
    userRepository,
    boulderRepository
  );
  const ascentController = AscentController.build(ascentService);

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
  apiExpress.addGetRoute(
    "/boulders/",
    boulderController.get.bind(boulderController)
  );
  apiExpress.addGetRoute("/user", userController.get.bind(userController));
  apiExpress.addGetRoute(
    "/user/ascents",
    ascentController.get.bind(ascentController)
  );

  apiExpress.start(8000);
}

main();
