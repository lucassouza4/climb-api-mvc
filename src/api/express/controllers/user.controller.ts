import { Request, Response } from "express";
import { UserUsecaseService } from "../../../services/user/usecase/user.usecase.service";
import { verifyToken } from "../../../util/jwt.util";
import { CustomError } from "../../../util/errors.util";

export class UserController {
  private constructor(readonly service: UserUsecaseService) {}

  public static build(service: UserUsecaseService) {
    return new UserController(service);
  }

  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await this.service.create(name, email, password);

    if (result instanceof CustomError)
      res.status(result.statusCode).json(result.message);
    else res.status(201).json(result);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this.service.login(email, password);

    if (result instanceof CustomError)
      res.status(result.statusCode).json(result.message);
    else res.status(200).json(result);
  }

  public async get(req: Request, res: Response) {
    const userId = req.query.userId as string;
    const decodedToken = verifyToken(req);

    let result;

    if (decodedToken instanceof Error) {
      res.status(400).json(decodedToken.message);
    } else {
      if (userId === undefined) {
        result = await this.service.list();
      } else {
        result = await this.service.get(userId, decodedToken);
      }
      if (result instanceof CustomError)
        res.status(result.statusCode).json(result.message);
      else res.status(200).json(result);
    }
  }
}
