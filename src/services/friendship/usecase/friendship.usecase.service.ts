import { Friendship } from "../../../entities/friendship/friendship";
import { User } from "../../../entities/user/user";
import { FriendshipRepository } from "../../../repositories/friendship/friendship.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { Status } from "../../../util/enums/friendship";
import {
  FriendshipNotFoundError,
  FriendshipRepositoryError,
  InvalidFriendshipDataError,
  InvalidUserDataError,
  UserNotFoundError,
} from "../../../util/errors.util";
import { Payload } from "../../../util/jwt.util";
import { FriendshipListOutput, FriendshipService } from "../friendship.service";

export class FriendshipUsecaseService implements FriendshipService {
  private constructor(
    readonly friendshipRepository: FriendshipRepository,
    readonly userRepository: UserRepository
  ) {}

  public static build(
    friendshipRepository: FriendshipRepository,
    userRepository: UserRepository
  ) {
    return new FriendshipUsecaseService(friendshipRepository, userRepository);
  }
  public async create(
    requesterId: string,
    addresseeId: string,
    payload: Payload
  ): Promise<FriendshipListOutput | Error> {
    const requester = await this.userRepository.getByID(requesterId);
    if (requester instanceof Error) {
      return new UserNotFoundError();
    }

    if (requester.id !== payload.id) {
      return new InvalidUserDataError("Usuário não corresponde ao login");
    }

    if (addresseeId === payload.id) {
      return new InvalidFriendshipDataError();
    }

    const addressee = await this.userRepository.getByID(addresseeId);
    if (addressee instanceof Error) {
      return new UserNotFoundError();
    }

    const friendship = Friendship.build(requesterId, addresseeId);
    if (friendship instanceof Error) {
      return new InvalidFriendshipDataError();
    }

    const friendshipCreated = await this.friendshipRepository.save(friendship);
    if (friendshipCreated instanceof Error) {
      return new FriendshipRepositoryError(friendshipCreated.message);
    }

    return this.presentOutput(
      friendshipCreated.Id,
      requester.name,
      addressee.name,
      friendshipCreated.Status
    );
  }

  public async list(
    userId: string,
    payload: Payload
  ): Promise<FriendshipListOutput | Error> {
    const user = await this.userRepository.getByID(userId);
    if (user instanceof Error) {
      return new UserNotFoundError();
    }

    if (user.id !== payload.id) {
      return new InvalidUserDataError("Usuário não corresponde ao login");
    }

    const friendshipsRequester =
      await this.friendshipRepository.getAllRequester(userId);
    if (friendshipsRequester instanceof Error) {
      return new FriendshipNotFoundError();
    }

    const friendshipsAddressee =
      await this.friendshipRepository.getAllAddressee(userId);
    if (friendshipsAddressee instanceof Error) {
      return new FriendshipNotFoundError();
    }

    const friendships = [...friendshipsRequester, ...friendshipsAddressee];

    const adresseesId = friendshipsRequester.map((friendship) => {
      return friendship.AdresseeId;
    });

    const addresseeUsers = await this.userRepository.getAll(adresseesId);
    if (addresseeUsers instanceof Error) {
      return new UserNotFoundError();
    }

    const requesterId = friendshipsAddressee.map((friendship) => {
      return friendship.RequesterId;
    });

    const requesterUsers = await this.userRepository.getAll(requesterId);
    if (requesterUsers instanceof Error) {
      return new UserNotFoundError();
    }

    return this.presentListOutPut(
      user,
      friendships,
      addresseeUsers,
      requesterUsers
    );
  }

  public async update(
    id: string,
    status: Status,
    payload: Payload
  ): Promise<FriendshipListOutput | Error> {
    const friendship = await this.friendshipRepository.get(id);
    if (friendship instanceof Error) {
      return new FriendshipNotFoundError();
    }

    const requester = await this.userRepository.getByID(friendship.RequesterId);
    if (requester instanceof Error) {
      return new UserNotFoundError();
    }

    const addressee = await this.userRepository.getByID(friendship.AdresseeId);
    if (addressee instanceof Error) {
      return new UserNotFoundError();
    }

    if (friendship.AdresseeId !== payload.id) {
      return new InvalidUserDataError(
        "Usuário não pode alterar esse pedido de amizade"
      );
    }

    const updatedFriendship = Friendship.with(
      friendship.Id,
      friendship.RequesterId,
      friendship.AdresseeId,
      status
    );
    if (updatedFriendship instanceof Error) {
      return new InvalidFriendshipDataError();
    }

    const savedFriendship =
      await this.friendshipRepository.update(updatedFriendship);

    if (savedFriendship instanceof Error) {
      return new FriendshipRepositoryError(savedFriendship.message);
    }

    return this.presentOutput(
      savedFriendship.Id,
      requester.name,
      addressee.name,
      savedFriendship.Status
    );
  }
  public async delete(id: string, payload: Payload): Promise<void | Error> {
    const friendship = await this.friendshipRepository.get(id);
    if (friendship instanceof Error) {
      return new FriendshipNotFoundError();
    }

    if (
      friendship.AdresseeId !== payload.id &&
      friendship.RequesterId !== payload.id
    ) {
      return new InvalidUserDataError(
        "Usuário não pode deletar esse pedido de amizade"
      );
    }

    return await this.friendshipRepository.delete(id);
  }

  private presentOutput(
    id: string,
    requesterName: string,
    addresseeName: string,
    status: Status
  ): FriendshipListOutput {
    const output = {
      friendships: [
        {
          id,
          requesterName,
          addresseeName,
          status,
        },
      ],
    };

    return output;
  }
  private presentListOutPut(
    user: User,
    friendshipsList: Friendship[],
    addresseeUsers: User[],
    requesterUsers: User[]
  ): FriendshipListOutput {
    const friendshipOutPut: FriendshipListOutput = {
      friendships: friendshipsList.map((friendship) => {
        return {
          id: friendship.Id,
          requesterName:
            user.id === friendship.RequesterId
              ? user.name
              : requesterUsers.find((u) => u.id === friendship.RequesterId)
                  ?.name || "Unknown",
          addresseeName:
            user.id === friendship.AdresseeId
              ? user.name
              : addresseeUsers.find((u) => u.id === friendship.AdresseeId)
                  ?.name || "Unknown",
          status: friendship.Status,
        };
      }),
    };
    return friendshipOutPut;
  }
}
