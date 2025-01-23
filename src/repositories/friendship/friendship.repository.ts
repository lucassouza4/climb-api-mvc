import { Friendship } from "../../entities/friendship/friendship";

export interface FriendshipRepository {
  save(friendship: Friendship): Promise<Friendship | Error>;
  get(id: string): Promise<Friendship | Error>;
  getAllRequester(requesterId: string): Promise<Friendship[] | Error>;
  getAllAddressee(addresseeId: string): Promise<Friendship[] | Error>;
  update(friendship: Friendship): Promise<Friendship | Error>;
  delete(id: string): Promise<void | Error>;
}
