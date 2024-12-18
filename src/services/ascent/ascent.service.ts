import { Payload } from "../../util/jwt.util";

export type ListAscentOutputDto = {
  boulders: {
    id: string;
    name: string;
    difficulty: number;
    sector: string;
    city: string;
    ascents: number;
  }[];
};
export type AscentOutputDto = {
  id: string;
  name: string;
  email: string;
  score: number;
};

export interface AscentService {
  create(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<AscentOutputDto | Error>;
  get(userId: string, token: Payload): Promise<ListAscentOutputDto | Error>;
  delete(
    userId: string,
    boulderId: string,
    token: Payload
  ): Promise<void | Error>;
}
