import { Payload } from "../../util/jwt.util";
import { ListBoulderOutputDto } from "../boulder/boulder.service";

export type AscentOutputDto = { id: string; userId: string; boulderId: string };

export interface AscentService {
  create(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<AscentOutputDto | Error>;
  get(userId: string, token: Payload): Promise<ListBoulderOutputDto | Error>;
  update(id: string, token: Payload): Promise<AscentOutputDto | Error>;
  delete(id: string, token: Payload): Promise<AscentOutputDto | Error>;
}
