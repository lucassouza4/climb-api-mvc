export type BoulderProps = {
  id: string;
  name: string;
  city: string;
  sector: string;
  difficulty: number;
  ascents: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
};

export class Boulder {
  private constructor(readonly props: BoulderProps) {}

  public static build(
    name: string,
    sector: string,
    city: string,
    difficulty: number
  ) {
    if (!this.validate(difficulty)) {
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

  public static with(
    id: string,
    name: string,
    city: string,
    sector: string,
    difficulty: number,
    ascents: number
  ) {
    if (!this.validate(difficulty, ascents)) {
      return new Error(
        "Dificuldade e quantidade de ascensões não podem ser menores que zero"
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

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get sector() {
    return this.props.sector;
  }

  public get city() {
    return this.props.city;
  }

  public get difficulty() {
    return this.props.difficulty;
  }

  public get ascents() {
    return this.props.ascents;
  }

  public encreaseAscents() {
    this.props.ascents += 1;
  }

  public decreaseAscents() {
    this.props.ascents -= 1;
  }

  public static validate(difficulty: number, ascents?: number) {
    if (difficulty < 0) {
      return false;
    }
    if (ascents && ascents < 0) {
      return false;
    }
    return true;
  }
}
