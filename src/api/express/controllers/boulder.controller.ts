import { Request, Response } from "express";
import { BoulderUsecaseService } from "../../../services/boulder/usecase/boulder.usecase.service";
import { prisma } from "../../../util/prisma.util";
import { BoulderRepositoryPrisma } from "../../../repositories/boulder/prisma/boulder.repository.prisma";

export class BoulderController {
  private constructor() {}

  public static build() {
    return new BoulderController();
  }

  public async create(req: Request, res: Response) {
    const repository = BoulderRepositoryPrisma.build(prisma);
    const service = BoulderUsecaseService.build(repository);

    const { name, city, sector, difficulty } = req.body;

    const result = await service.Create(name, difficulty, sector, city);

    if (result instanceof Error) res.status(400).json(result.message).send();
    else res.status(201).json(result).send();
  }

  public async get(req: Request, res: Response) {
    const repository = BoulderRepositoryPrisma.build(prisma);
    const service = BoulderUsecaseService.build(repository);

    const id = req.query.id as string;

    if (id === undefined) {
      const { name, city, sector, difficulty } = req.body;

      const result = await service.List(name, difficulty, sector, city);

      if (result instanceof Error) res.status(400).json(result.message).send();
      else res.status(200).json(result);
    } else {
      const result = await service.Get(id);

      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(200).json(result);
    }
  }

  public async increase(req: Request, res: Response) {
    const repository = BoulderRepositoryPrisma.build(prisma);
    const service = BoulderUsecaseService.build(repository);

    const id = req.query.id as string;

    if (!id) {
      res.status(400).json("ID precisa ser fornecido");
    } else {
      const result = await service.IncreaseAscents(id);
      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(200).json(result).send();
    }
  }
}

// Retirar repository e service daqui
