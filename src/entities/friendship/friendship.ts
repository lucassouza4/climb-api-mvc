import { v4 as uuidv4 } from "uuid";
import { Status } from "../../util/enums/friendship";

export type FriendshipProps = {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: Status;
};

export class Friendship {
  private constructor(readonly props: FriendshipProps) {}

  public static build(requesterId: string, addresseeId: string) {
    return new Friendship({
      id: uuidv4(),
      addresseeId,
      requesterId,
      status: Status.PENDING,
    });
  }

  public static with(
    id: string,
    requesterId: string,
    addresseeId: string,
    status: Status
  ) {
    return new Friendship({ id, requesterId, addresseeId, status });
  }

  public changeStatus(newStatus: Status) {
    this.props.status = newStatus;
  }

  public get Id() {
    return this.props.id;
  }

  public get RequesterId() {
    return this.props.requesterId;
  }

  public get AdresseeId() {
    return this.props.addresseeId;
  }

  public get Status() {
    return this.props.status;
  }
}
