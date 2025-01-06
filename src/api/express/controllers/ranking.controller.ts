import { RankingUsecaseService } from "../../../services/ranking/usecase/ranking.service.usecase";
import { Request, Response } from "express";
import { verifyToken } from "../../../util/jwt.util";
import { CustomError } from "../../../util/errors.util";

export class RankingController {
  private constructor(readonly service: RankingUsecaseService) {}

  public static build(service: RankingUsecaseService) {
    return new RankingController(service);
  }

  public async get(req: Request, res: Response) {
    const decodedToken = verifyToken(req);
    if (decodedToken instanceof Error) {
      res.status(400).json(decodedToken.message);
    } else {
      const result = await this.service.get();
      if (result instanceof CustomError) {
        res.status(result.statusCode).json(result.message);
      } else {
        res.status(200).json(result);
      }
    }
  }
}
