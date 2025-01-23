import { Status } from "../../util/enums/friendship";
import { Payload } from "../../util/jwt.util";

export type FriendshipListOutput = {
  friendships: {
    id: string;
    requesterName: string;
    addresseeName: string;
    status: Status;
  }[];
};

export interface FriendshipService {
  create(
    requesterId: string,
    addresseeId: string,
    payload: Payload
  ): Promise<FriendshipListOutput | Error>;
  list(userId: string, payload: Payload): Promise<FriendshipListOutput | Error>;
  update(
    id: string,
    status: Status,
    payload: Payload
  ): Promise<FriendshipListOutput | Error>;
  delete(id: string, payload: Payload): Promise<void | Error>;
}
