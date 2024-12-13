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
  Create(
    name: string,
    difficulty: number,
    sector: string,
    city: string,
  ): Promise<BoulderOutputDto | Error>;
  List(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string,
  ): Promise<ListBoulderOutputDto | Error>;
  Get(id: string): Promise<BoulderOutputDto | Error>;
  IncreaseAscents(id: string): Promise<BoulderOutputDto | Error>;
}
