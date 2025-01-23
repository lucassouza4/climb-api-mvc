import { PrismaClient } from "@prisma/client";
import { Friendship } from "../../../entities/friendship/friendship";
import { FriendshipRepository } from "../friendship.repository";
import { Status } from "../../../util/enums/friendship";
import { FriendshipNotFoundError } from "../../../util/errors.util";

export class FriendshipRepositoryPrisma implements FriendshipRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new FriendshipRepositoryPrisma(prisma);
  }

  public async save(friendship: Friendship): Promise<Friendship | Error> {
    try {
      const newFriendship = await this.prisma.friendship.create({
        data: {
          id: friendship.Id,
          requesterId: friendship.RequesterId,
          addresseeId: friendship.AdresseeId,
          status: Status[friendship.Status] as keyof typeof Status,
        },
      });
      return Friendship.with(
        newFriendship.id,
        newFriendship.requesterId,
        newFriendship.addresseeId,
        Status[newFriendship.status]
      );
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  public async get(id: string): Promise<Friendship | Error> {
    try {
      const friendship = await this.prisma.friendship.findUnique({
        where: { id },
      });
      if (friendship)
        return Friendship.with(
          friendship.id,
          friendship.requesterId,
          friendship.addresseeId,
          Status[friendship.status]
        );
      return new FriendshipNotFoundError();
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  public async getAllRequester(
    requesterId: string
  ): Promise<Friendship[] | Error> {
    try {
      const friendshipRequests = await this.prisma.friendship.findMany({
        where: { requesterId },
      });

      return friendshipRequests.map((request) => {
        return Friendship.with(
          request.id,
          request.requesterId,
          request.addresseeId,
          Status[request.status]
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  public async getAllAddressee(
    addresseeId: string
  ): Promise<Friendship[] | Error> {
    try {
      const friendshipAdressee = await this.prisma.friendship.findMany({
        where: { addresseeId },
      });

      return friendshipAdressee.map((request) => {
        return Friendship.with(
          request.id,
          request.requesterId,
          request.addresseeId,
          Status[request.status]
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  public async update(friendship: Friendship): Promise<Friendship | Error> {
    try {
      const updatedFriendship = await this.prisma.friendship.update({
        where: { id: friendship.Id },
        data: {
          requesterId: friendship.RequesterId,
          addresseeId: friendship.AdresseeId,
          status: Status[friendship.Status] as keyof typeof Status,
        },
      });

      return Friendship.with(
        updatedFriendship.id,
        updatedFriendship.requesterId,
        updatedFriendship.addresseeId,
        Status[updatedFriendship.status]
      );
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }

  public async delete(id: string): Promise<void | Error> {
    try {
      await this.prisma.friendship.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error("Unknown error occurred.");
    }
  }
}
