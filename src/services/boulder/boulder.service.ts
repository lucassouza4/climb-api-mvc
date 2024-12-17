export type BoulderOutputDto = {
  id: string;
  name: string;
  difficulty: number;
  sector: string;
  city: string;
  ascents: number;
};

export type ListBoulderOutputDto = {
  boulders: {
    id: string;
    name: string;
    difficulty: number;
    sector: string;
    city: string;
    ascents: number;
  }[];
};

export interface BoulderService {
  create(
    name: string,
    difficulty: number,
    sector: string,
    city: string
  ): Promise<BoulderOutputDto | Error>;
  list(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string
  ): Promise<ListBoulderOutputDto | Error>;
  get(id: string): Promise<BoulderOutputDto | Error>;
  increaseAscents(id: string): Promise<BoulderOutputDto | Error>;
}
