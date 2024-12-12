import { ApiExpress } from "./api/express/api.express";
import { BoulderController } from "./api/express/controllers/boulder.controller";
import { BoulderRepositoryPrisma } from "./repositories/boulder/prisma/boulder.repository.prisma";
import { BoulderUsecaseService } from "./services/boulder/usecase/boulder.usecase.service";
import { prisma } from "./util/prisma.util";

function main() {
  const apiExpress = ApiExpress.build();

  const repository = BoulderRepositoryPrisma.build(prisma);
  const service = BoulderUsecaseService.build(repository);
  const boulderController = BoulderController.build(service);

  apiExpress.addPostRoute(
    "/boulders/create",
    boulderController.create.bind(boulderController),
  );
  apiExpress.addGetRoute(
    "/boulders/",
    boulderController.get.bind(boulderController),
  );
  apiExpress.addPutRoute(
    "/boulders/increase/",
    boulderController.increase.bind(boulderController),
  );

  apiExpress.start(8000);
}

main();
