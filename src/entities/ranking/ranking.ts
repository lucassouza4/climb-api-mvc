export type RankingProps = {
  id: string;
  name: string;
  score: number;
};

export class Ranking {
  private constructor(readonly props: RankingProps[]) {}

  public build(props: RankingProps[]) {
    return new Ranking(props);
  }
}
