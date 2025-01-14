import Redis from "ioredis";

export const redisClientMock = {
  set: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  zadd: jest.fn(),
  zrem: jest.fn(),
  zrevrange: jest.fn(),
  zrevrank: jest.fn(),
  getRank: jest.fn(),
  getRanksForMembers: jest.fn(),
  close: jest.fn(),
} as unknown as jest.Mocked<Redis>;
