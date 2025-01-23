import { Request, Response } from "express";
import { FriendshipService } from "../../../services/friendship/friendship.service";
import { verifyToken } from "../../../util/jwt.util";
import { CustomError } from "../../../util/errors.util";

export class FriendshipController {
  private constructor(private readonly service: FriendshipService) {}

  public static build(service: FriendshipService) {
    return new FriendshipController(service);
  }

  public async create(req: Request, res: Response) {
    const { requesterId, addresseeId } = req.body;
    const decodedToken = verifyToken(req);

    if (decodedToken instanceof Error) {
      res.status(400).json(decodedToken.message);
    } else {
      const result = await this.service.create(
        requesterId,
        addresseeId,
        decodedToken
      );

      if (result instanceof CustomError)
        res.status(result.statusCode).json(result.message);
      else res.status(201).json(result);
    }
  }

  public async get(req: Request, res: Response) {
    const userId = req.query.userId as string;
    const decodedToken = verifyToken(req);

    if (decodedToken instanceof Error) {
      res.status(400).json(decodedToken.message);
    } else {
      const result = await this.service.list(userId, decodedToken);

      if (result instanceof CustomError)
        res.status(result.statusCode).json(result.message);
      else res.status(200).json(result);
    }
  }

  public async update(req: Request, res: Response) {
    const friendshipId = req.query.friendshipId as string;
    const { status } = req.body;
    const decodedToken = verifyToken(req);

    if (decodedToken instanceof Error) {
      res.status(400).json(decodedToken.message);
    } else {
      const result = await this.service.update(
        friendshipId,
        status,
        decodedToken
      );

      if (result instanceof CustomError)
        res.status(result.statusCode).json(result.message);
      else res.status(200).json(result);
    }
  }

  public async delete(req: Request, res: Response) {
    const friendshipId = req.query.friendshipId as string;
    const decodedToken = verifyToken(req);

    if (decodedToken instanceof Error) {
      res.status(400).json(decodedToken.message);
    } else {
      const result = await this.service.delete(friendshipId, decodedToken);

      if (result instanceof CustomError)
        res.status(result.statusCode).json(result.message);
      else res.status(200).json(result);
    }
  }
}
