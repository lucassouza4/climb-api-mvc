import Redis from "ioredis";

export const boulderRepositoryMock = {
  save: jest.fn(),
  get: jest.fn(),
  getByID: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const userRepositoryMock = {
  save: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  getByID: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const ascentRepositoryMock = {
  save: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
};

export const redisClientMock = {
  set: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  zadd: jest.fn(),
  zrem: jest.fn(),
  zrevrange: jest.fn(),
  getRank: jest.fn(),
  getRanksForMembers: jest.fn(),
  close: jest.fn(),
} as unknown as jest.Mocked<Redis>;
