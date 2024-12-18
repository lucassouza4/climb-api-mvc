import { Permissions, Type } from "../../util/enums/user";

export type UserProps = {
  id: string;
  type: Type;
  name: string;
  email: string;
  score: number;
  password?: string;
  // foto: string;
};

export abstract class User {
  protected constructor(readonly props: UserProps) {}

  public incrementScore(value: number) {
    this.props.score += value * 10;
  }

  public get id() {
    return this.props.id;
  }
  public get type() {
    return this.props.type;
  }
  public get name() {
    return this.props.name;
  }
  public get email() {
    return this.props.email;
  }
  public get score() {
    return this.props.score;
  }
  public get password() {
    return this.props.password;
  }
  // public get foto() {
  //   return this.props.foto;
  // }

  public validatePassword(password: string): boolean {
    return this.props.password === password;
  }

  public abstract getPermissions(): Permissions[];
}
