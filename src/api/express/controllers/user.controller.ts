import { Request, Response } from "express";
import { UserUsecaseService } from "../../../services/user/usecase/user.usecase.service";

export class UserController {
  private constructor(readonly service: UserUsecaseService) {}

  public static build(service: UserUsecaseService) {
    return new UserController(service);
  }

  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await this.service.create(name, email, password);

    if (result instanceof Error) res.status(400).json(result.message);
    else res.status(201).json(result);
  }

  public async get(req: Request, res: Response) {
    const email = req.query.email as string;
    const result = await this.service.get(email);

    if (result instanceof Error) res.status(400).json(result.message);
    else res.status(201).json(result);
  }
}
