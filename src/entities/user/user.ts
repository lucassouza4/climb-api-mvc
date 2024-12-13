import { Permissions, Type } from "../../util/enums/user";

export type UserProps = {
  id: string;
  type: Type;
  name: string;
  email: string;
  password?: string;
  // foto: string;
};

export abstract class User {
  protected constructor(readonly props: UserProps) {}

  public get Id() {
    return this.props.id;
  }
  public get Type() {
    return this.props.type;
  }
  public get Name() {
    return this.props.name;
  }
  public get Email() {
    return this.props.email;
  }
  public get Password() {
    return this.props.password;
  }
  // public get Foto() {
  //   return this.props.foto;
  // }

  public validatePassword(password: string): boolean {
    return this.props.password === password;
  }

  public abstract getPermissions(): Permissions[];
}
