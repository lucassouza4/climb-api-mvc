import { ApiExpress } from "./api/express/api.express";
import { BoulderController } from "./api/express/controllers/boulder.controller";

function main() {
  const apiExpress = ApiExpress.build();
  const boulderController = BoulderController.build();

  apiExpress.addPostRoute("/boulders/create", boulderController.create);
  apiExpress.addGetRoute("/boulders/", boulderController.get);
  apiExpress.addPutRoute("/boulders/increase/", boulderController.increase);

  apiExpress.start(8000);
}

main();
