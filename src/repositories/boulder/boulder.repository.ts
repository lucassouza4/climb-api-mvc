import { Boulder } from "../../entities/boulder/boulder";

export interface BoulderRepository {
  save(bouder: Boulder): Promise<Boulder | Error>;
  getByID(id: string): Promise<Boulder | Error>;
  get(query: {
    name?: string;
    city?: string;
    sector?: string;
    difficulty?: number;
  }): Promise<Boulder[] | Error>;
  getAll(ids?: string[]): Promise<Boulder[] | Error>;
  update(boulder: Boulder): Promise<Boulder | Error>;
  delete(id: string): Promise<void | Error>;
}
