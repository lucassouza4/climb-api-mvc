import { Request, Response } from "express";
import { BoulderUsecaseService } from "../../../services/boulder/usecase/boulder.usecase.service";
import { CustomError } from "../../../util/errors.util";

export class BoulderController {
  private constructor(private readonly service: BoulderUsecaseService) {}

  public static build(service: BoulderUsecaseService) {
    return new BoulderController(service);
  }

  public async create(req: Request, res: Response) {
    const { name, city, sector, difficulty } = req.body;

    const result = await this.service.create(name, difficulty, sector, city);

    if (result instanceof CustomError)
      res.status(result.statusCode).json(result.message);
    else res.status(201).json(result);
  }

  public async get(req: Request, res: Response) {
    const id = req.query.id as string;
    let result;

    if (id === undefined) {
      const { name, city, sector, difficulty } = req.body; // ERRADO

      result = await this.service.list(name, difficulty, sector, city);
    } else {
      result = await this.service.get(id);
    }
    if (result instanceof CustomError)
      res.status(result.statusCode).json(result.message);
    else res.status(200).json(result);
  }
}
