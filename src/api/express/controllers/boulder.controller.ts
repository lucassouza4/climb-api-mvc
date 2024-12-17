import { Request, Response } from "express";
import { BoulderUsecaseService } from "../../../services/boulder/usecase/boulder.usecase.service";

export class BoulderController {
  private constructor(private readonly service: BoulderUsecaseService) {}

  public static build(service: BoulderUsecaseService) {
    return new BoulderController(service);
  }

  public async create(req: Request, res: Response) {
    const { name, city, sector, difficulty } = req.body;

    const result = await this.service.create(name, difficulty, sector, city);

    if (result instanceof Error) res.status(400).json(result.message);
    else res.status(201).json(result);
  }

  public async get(req: Request, res: Response) {
    const id = req.query.id as string;

    if (id === undefined) {
      const { name, city, sector, difficulty } = req.body; // ERRADO

      const result = await this.service.list(name, difficulty, sector, city);

      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(200).json(result);
    } else {
      const result = await this.service.get(id);

      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(200).json(result);
    }
  }

  public async increase(req: Request, res: Response) {
    const id = req.query.id as string;

    if (!id) {
      res.status(400).json("ID precisa ser fornecido");
    } else {
      const result = await this.service.increaseAscents(id);
      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(200).json(result);
    }
  }
}

// Retirar repository e service daqui
