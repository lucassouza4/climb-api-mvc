import { Payload } from "../../util/jwt.util";
import { ListBoulderOutputDto } from "../boulder/boulder.service";

export type AscentOutputDto = { id: string; userId: string; boulderId: string };

export interface AscentService {
  Create(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<AscentOutputDto | Error>;
  Get(userId: string, token: Payload): Promise<ListBoulderOutputDto | Error>;
  Update(id: string, token: Payload): Promise<AscentOutputDto | Error>;
  Delete(id: string, token: Payload): Promise<AscentOutputDto | Error>;
}
