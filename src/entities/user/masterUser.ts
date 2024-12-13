import { Permissions, Type } from "../../util/enums/user";
import { User, UserProps } from "./user";

export class MasterUser extends User {
  private constructor(readonly props: UserProps) {
    super(props);
  }

  public static build(name: string, email: string, password?: string) {
    return new MasterUser({
      id: crypto.randomUUID().toString(),
      type: Type.MASTER,
      name,
      email,
      password,
    });
  }

  public static with(id: string, name: string, email: string) {
    return new MasterUser({
      id,
      type: Type.MASTER,
      name,
      email,
    });
  }

  public getPermissions(): Permissions[] {
    return [
      Permissions.READ_BOULDER,
      Permissions.UPDATE_BOULDER,
      Permissions.CREATE_BOULDER,
      Permissions.DELETE_BOULDER,
    ];
  }
}
