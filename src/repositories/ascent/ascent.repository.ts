import { Ascent } from "../../entities/ascent/ascent";

export interface AscentRepository {
  save(ascent: Ascent): Promise<Ascent | Error>;
  getById(id: string): Promise<Ascent | Error>;
  get(userId: string, boulderId: string): Promise<Ascent | Error>;
  getAll(userId: string): Promise<Ascent[] | Error>;
  update(ascent: Ascent): Promise<Ascent | Error>;
  delete(id: string): Promise<void | Error>;
}
