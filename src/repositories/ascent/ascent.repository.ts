import { Ascent } from "../../entities/ascent/ascent";

export interface AscentRepository {
  save(ascent: Ascent): Promise<Ascent | Error>;
  get(userId: string, boulderId: string): Promise<Ascent | Error>;
  getAll(userId: string): Promise<Ascent[] | Error>;
  delete(userId: string, boulderId: string): Promise<void | Error>;
}
