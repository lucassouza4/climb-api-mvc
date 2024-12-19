import { Payload } from "../../util/jwt.util";

export interface AscentService {
  create(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<void | Error>;
  get(userId: string, token: Payload): Promise<void | Error>;
  delete(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<void | Error>;
}
