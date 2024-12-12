export type BoulderProps = {
  id: string;
  name: string;
  city: string;
  sector: string;
  difficulty: number;
  ascents: number;
};

export class Boulder {
  private constructor(readonly props: BoulderProps) {}

  public static Create(
    name: string,
    sector: string,
    city: string,
    difficulty: number,
  ) {
    if (!this.Validate(difficulty)) {
      return new Error("Dificuldade não pode ser menor que zero");
    }
    return new Boulder({
      id: crypto.randomUUID().toString(),
      name: name.toUpperCase(),
      sector: sector.toUpperCase(),
      city: city.toUpperCase(),
      difficulty: difficulty,
      ascents: 0,
    });
  }

  public static With(
    id: string,
    name: string,
    city: string,
    sector: string,
    difficulty: number,
    ascents: number,
  ) {
    if (!this.Validate(difficulty, ascents)) {
      return new Error(
        "Dificuldade e quantidade de ascensões não podem ser menores que zero",
      );
    }
    return new Boulder({
      id,
      name,
      city,
      sector,
      difficulty,
      ascents,
    });
  }

  public get Id() {
    return this.props.id;
  }

  public get Name() {
    return this.props.name;
  }

  public get Sector() {
    return this.props.sector;
  }

  public get City() {
    return this.props.city;
  }

  public get Difficulty() {
    return this.props.difficulty;
  }

  public get Ascents() {
    return this.props.ascents;
  }

  public IncrementAscents() {
    this.props.ascents += 1;
  }

  public static Validate(difficulty: number, ascents?: number) {
    if (difficulty < 0) {
      return false;
    }
    if (ascents && ascents < 0) {
      return false;
    }
    return true;
  }
}
