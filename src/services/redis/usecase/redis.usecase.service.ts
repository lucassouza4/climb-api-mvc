import Redis from "ioredis";
import { IRedisService } from "../redis.service";

export class RedisService implements IRedisService {
  private client: Redis;

  constructor(client: Redis) {
    this.client = client;
  }

  public async set(
    key: string,
    value: string,
    expiryInSeconds?: number
  ): Promise<void> {
    if (expiryInSeconds) {
      await this.client.set(key, value, "EX", expiryInSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  public async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  public async delete(key: string): Promise<number> {
    return await this.client.del(key);
  }

  public async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  public async increment(key: string): Promise<number> {
    return await this.client.incr(key);
  }

  public async decrement(key: string): Promise<number> {
    return await this.client.decr(key);
  }

  public async zadd(
    key: string,
    score: number,
    member: string
  ): Promise<number> {
    return await this.client.zadd(key, score, member);
  }

  public async zrem(key: string, member: string): Promise<number> {
    return await this.client.zrem(key, member);
  }

  public async zrevrange(
    key: string,
    start: number,
    stop: number,
    withScores: "WITHSCORES"
  ): Promise<string[]> {
    return await this.client.zrevrange(key, start, stop, withScores);
  }

  public async getRank(key: string, member: string): Promise<number | null> {
    const rank = await this.client.zrevrank(key, member);
    if (rank === null) {
      return null;
    }
    return rank + 1;
  }

  public async getRanksForMembers(
    key: string,
    members: string[]
  ): Promise<Map<string, number | undefined>> {
    const ranks = new Map<string, number | undefined>();

    for (const member of members) {
      const rank = await this.client.zrevrank(key, member);
      if (rank == null) ranks.set(member, undefined);
      else ranks.set(member, rank + 1);
    }

    return ranks;
  }

  public close(): void {
    this.client.quit();
  }
}
