import { Request, Response } from "express";
import { AscentUsecaseService } from "../../../services/ascent/usecase/ascent.usecase.service";
import { verifyToken } from "../../../util/jwt.util";

export class AscentController {
  private constructor(private readonly service: AscentUsecaseService) {}

  public static build(service: AscentUsecaseService) {
    return new AscentController(service);
  }

  public async create(req: Request, res: Response) {
    const { userId, boulderId } = req.body;
    const decodedToken = verifyToken(req);

    if (decodedToken instanceof Error) {
      res.status(401).json(decodedToken.message);
    } else {
      const result = await this.service.Create(userId, boulderId, decodedToken);

      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(201).json(result);
    }
  }

  public async get(req: Request, res: Response) {
    const userId = req.query.userId as string;
    const decodedToken = verifyToken(req);

    if (decodedToken instanceof Error) {
      res.status(401).json(decodedToken.message);
    } else {
      const result = await this.service.Get(userId, decodedToken);
      if (result instanceof Error) res.status(400).json(result.message);
      else res.status(200).json(result);
    }
  }
}
