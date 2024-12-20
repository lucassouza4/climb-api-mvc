export type RankingOutputDto = {
  ranking: { id: string; name: string; score: number }[];
};

export interface RankingService {
  get(): Promise<RankingOutputDto | Error>;
}
