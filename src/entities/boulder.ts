export type BoulderProps = {
  id: string;
  name: string;
  city: string;
  sector: string;
  difficulty: number;
  ascents: number;
};

export class Boulder {
  private constructor(readonly props: BoulderProps) {
    this.Validate();
  }

  public static Create(
    name: string,
    sector: string,
    city: string,
    difficulty: number,
  ) {
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
    difficulty: number,
    sector: string,
    city: string,
    ascents: number,
  ) {
    return new Boulder({
      id,
      name,
      difficulty,
      sector,
      city,
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

  public SetAscents() {
    this.props.ascents += 1;
  }

  private Validate() {
    if (
      this.props.name == null ||
      this.props.sector == null ||
      this.props.city == null
    ) {
      return new Error("nome, setor e cidade precisam ser fornecidos");
    }
    if (this.props.difficulty < 0 || this.props.difficulty == null) {
      return new Error("A dificuldade do boulder deve ser maior ou igual a V0");
    }
  }
}
