import { Permissions, Type } from "../../util/enums/user";
import { User, UserProps } from "./user";

export class BasicUser extends User {
  private constructor(readonly props: UserProps) {
    super(props);
  }

  public static build(name: string, email: string, password?: string) {
    return new BasicUser({
      id: crypto.randomUUID().toString(),
      type: Type.BASIC,
      name,
      email,
      password,
      score: 0,
    });
  }

  public static with(id: string, name: string, email: string, score: number) {
    return new BasicUser({
      id,
      type: Type.BASIC,
      name,
      email,
      score,
    });
  }

  public getPermissions(): Permissions[] {
    return [Permissions.READ_BOULDER];
  }
}
