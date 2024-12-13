import { ApiExpress } from "./api/express/api.express";
import { BoulderController } from "./api/express/controllers/boulder.controller";
import { UserController } from "./api/express/controllers/user.controller";
import { BoulderRepositoryPrisma } from "./repositories/boulder/prisma/boulder.repository.prisma";
import { UserRepositoryPrisma } from "./repositories/user/prisma/user.repository.prisma";
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

  apiExpress.addPostRoute(
    "/boulders/create",
    boulderController.create.bind(boulderController),
  );
  apiExpress.addPostRoute(
    "/users/create",
    userController.create.bind(userController),
  );
  apiExpress.addGetRoute(
    "/boulders/",
    boulderController.get.bind(boulderController),
  );
  apiExpress.addGetRoute("/users/", userController.get.bind(userController));
  apiExpress.addPutRoute(
    "/boulders/increase/",
    boulderController.increase.bind(boulderController),
  );

  apiExpress.start(8000);
}

main();
