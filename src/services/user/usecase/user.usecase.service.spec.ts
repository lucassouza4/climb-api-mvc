import { BasicUser } from "../../../entities/user/basicUser";
import { UserRepository } from "../../../repositories/user/user.repository";
import { Permissions } from "../../../util/enums/user";
import {
  InvalidUserDataError,
  UserAlreadyExistsError,
  UserNotFoundError,
  UserRepositoryError,
} from "../../../util/errors.util";
import { Payload } from "../../../util/jwt.util";
import { bcryptMock } from "../../../util/mocks/bcrypt";
import { jwtMock } from "../../../util/mocks/jwt";
import { userRepositoryMock } from "../../../util/mocks/prismaClient";
import { redisClientMock } from "../../../util/mocks/redisClient";
import { RedisService } from "../../redis/usecase/redis.usecase.service";
import { UserUsecaseService } from "./user.usecase.service";

let service: UserUsecaseService;

const input = { name: "teste", email: "teste", password: "teste" };
const permissions = [Permissions.READ_BOULDER, Permissions.UPDATE_BOULDER];
const user = BasicUser.build(
  input.name,
  input.email,
  input.password
) as BasicUser;

const savedUser = {
  id: "123",
  name: user.name,
  email: user.email,
  password: user.password,
  score: user.score,
  rank: 0,
  type: user.type,
  getPermissions: jest.fn().mockReturnValue(permissions),
};

jest.mock("jsonwebtoken", () => jwtMock);
jest.mock("bcrypt", () => bcryptMock);

beforeEach(() => {
  const redisServiceMock = new RedisService(redisClientMock);
  service = UserUsecaseService.build(
    userRepositoryMock as UserRepository,
    redisServiceMock
  );
  jest.clearAllMocks();

  process.env.JWT_TOKEN = "mockedSecret";
});

describe("Create - User usecase service", () => {
  it("Should create user", async () => {
    const output = {
      id: "123",
      name: "teste",
      email: "teste",
      score: 0,
      rank: 0,
      type: 0,
    };

    userRepositoryMock.get.mockResolvedValue(new Error());
    userRepositoryMock.save.mockResolvedValue(savedUser);

    const result = await service.create(
      input.name,
      input.email,
      input.password
    );

    expect(result).toEqual(output);
    expect(userRepositoryMock.get).toHaveBeenCalledWith(input.email);
  });
  it("Should not create a finded user", async () => {
    userRepositoryMock.get.mockResolvedValue(user);

    const output = new UserAlreadyExistsError();

    const result = await service.create(
      input.name,
      input.email,
      input.password
    );

    expect(result).toEqual(output);
    expect(userRepositoryMock.get).toHaveBeenCalledWith(input.email);
  });
  it("Should not save user", async () => {
    const output = new UserRepositoryError("Não foi possível salvar o usuário");

    userRepositoryMock.get.mockResolvedValue(new Error());
    userRepositoryMock.save.mockResolvedValue(new Error());

    const result = await service.create(
      input.name,
      input.email,
      input.password
    );

    expect(result).toEqual(output);
    expect(userRepositoryMock.get).toHaveBeenCalledWith(input.email);
  });
});

describe("Login - User usecase service", () => {
  it("Should make login", async () => {
    const token = "fakeToken";

    const output = {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      score: savedUser.score,
      type: savedUser.type,
      rank: savedUser.rank,
      token,
    };
    userRepositoryMock.get.mockResolvedValue(savedUser);
    jwtMock.sign.mockReturnValue(token);
    bcryptMock.compareSync.mockReturnValue(true);

    const result = await service.login(input.email, input.password);

    expect(result).toEqual(output);
    expect(userRepositoryMock.get).toHaveBeenCalledWith(input.email);
    expect(jwtMock.sign).toHaveBeenCalledWith(
      { id: savedUser.id, permissions },
      process.env.JWT_TOKEN
    );
  });
  it("Should not found user for login", async () => {
    const output = new UserNotFoundError();
    userRepositoryMock.get.mockResolvedValue(new Error());

    const result = await service.login(input.email, input.password);

    expect(result).toEqual(output);
  });
});

describe("Get - User usecase service", () => {
  it("Should get user", async () => {
    const id = "123";
    const token: Payload = {
      id: "123",
      permissions: [],
    };
    const output = {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      score: savedUser.score,
      type: savedUser.type,
      rank: savedUser.rank,
    };

    userRepositoryMock.getByID.mockResolvedValue(savedUser);

    const result = await service.get(id, token);

    expect(result).toEqual(output);
    expect(userRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });
  it("Should not found user", async () => {
    const id = "teste";
    const token: Payload = {
      id: "teste",
      permissions: [],
    };

    userRepositoryMock.getByID.mockResolvedValue(new Error());

    const result = await service.get(id, token);

    expect(result).toBeInstanceOf(Error);
    expect(userRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });
  it("Should not match id", async () => {
    const id = "123";
    const token: Payload = {
      id: "teste2",
      permissions: [],
    };

    const output = new InvalidUserDataError(
      "Usuário não correspondente ao login"
    );

    userRepositoryMock.getByID.mockResolvedValue(savedUser);

    const result = await service.get(id, token);

    expect(result).toEqual(output);
    expect(userRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });
});
