import { AscentRepository } from "../../../repositories/ascent/ascent.repository";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { Permissions } from "../../../util/enums/user";
import {
  ascentRepositoryMock,
  boulderRepositoryMock,
  userRepositoryMock,
} from "../../../util/mocks/prismaClient";
import { AscentUsecaseService } from "./ascent.usecase.service";

let service: AscentUsecaseService;

const permissions = [Permissions.READ_BOULDER, Permissions.UPDATE_BOULDER];

const savedUser = {
  id: "123",
  name: "teste",
  email: "teste",
  password: "teste",
  score: 0,
  type: 0,
  getPermissions: jest.fn().mockReturnValue(permissions),
  encreaseScore: jest.fn().mockReturnValue(null),
  decreaseScore: jest.fn().mockReturnValue(null),
};

const boulder = {
  id: "123",
  name: "teste",
  sector: "teste",
  city: "teste",
  difficulty: 0,
  ascents: 0,
};
const savedBoulder = {
  id: "123",
  name: "teste",
  sector: "teste",
  city: "teste",
  difficulty: 0,
  ascents: 0,
  encreaseAscents: jest.fn().mockReturnValue(null),
  decreaseAscents: jest.fn().mockReturnValue(null),
  map: jest.fn().mockReturnValue(boulder),
};

const savedAscent = {
  id: "123",
  userId: "123",
  boulderId: "123",
  map: jest.fn().mockReturnValue(null),
};

beforeEach(() => {
  service = AscentUsecaseService.build(
    ascentRepositoryMock as AscentRepository,
    userRepositoryMock as UserRepository,
    boulderRepositoryMock as BoulderRepository
  );
  jest.clearAllMocks();
});

describe("Create - Ascent usecase service", () => {
  const input = {
    userId: "teste", // NÃO É NECESSÁRIO
    boulderId: "teste",
    token: {
      id: "123",
      permissions: [],
    },
  };

  it("Should create a ascent", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(savedBoulder);
    ascentRepositoryMock.get.mockReturnValue(new Error());
    boulderRepositoryMock.update.mockReturnValue(savedBoulder);
    userRepositoryMock.update.mockReturnValue(savedUser);
    ascentRepositoryMock.save.mockReturnValue(savedAscent);

    const output = {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      score: savedUser.score,
    };

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toEqual(output);
  });
  it("Should not found user", async () => {
    const output = new Error("Usuário não encontrado");
    userRepositoryMock.getByID.mockResolvedValue(new Error());

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toEqual(output);
  });
  it("Should not validate user", async () => {
    const output = new Error("Usuário não corresponde ao login");
    const token = {
      id: "teste",
      permissions: [],
    };
    userRepositoryMock.getByID.mockResolvedValue(savedUser);

    const result = await service.create(input.userId, input.boulderId, token);
    expect(result).toEqual(output);
  });
  it("Should not found boulder", async () => {
    const output = new Error("Boulder não encontrado");

    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(new Error());

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toEqual(output);
  });
  it("Should find ascent", async () => {
    const output = new Error("Ascensão já existente");

    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(savedBoulder);
    ascentRepositoryMock.get.mockReturnValue(savedAscent);

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toEqual(output);
  });
  it("Should not update boulder", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(savedBoulder);
    ascentRepositoryMock.get.mockReturnValue(new Error());
    boulderRepositoryMock.update.mockReturnValue(new Error());

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toBeInstanceOf(Error);
  });
  it("Should not encrease user", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(savedBoulder);
    ascentRepositoryMock.get.mockReturnValue(new Error());
    boulderRepositoryMock.update.mockReturnValue(savedBoulder);
    userRepositoryMock.update.mockReturnValue(new Error());

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toBeInstanceOf(Error);
  });
  it("Should not save ascent", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(savedBoulder);
    ascentRepositoryMock.get.mockReturnValue(new Error());
    boulderRepositoryMock.update.mockReturnValue(savedBoulder);
    userRepositoryMock.update.mockReturnValue(savedUser);
    ascentRepositoryMock.save.mockReturnValue(new Error());

    const result = await service.create(
      input.userId,
      input.boulderId,
      input.token
    );
    expect(result).toBeInstanceOf(Error);
  });
});
describe("Get - Ascent usecase service", () => {
  const input = {
    userId: "123",
    token: {
      id: "123",
      permissions: [],
    },
  };
  it("Should get ascent", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    ascentRepositoryMock.getAll.mockResolvedValue(savedAscent);
    boulderRepositoryMock.getAll.mockResolvedValue(savedBoulder);

    const output = {
      boulders: {
        ...boulder,
      },
    };

    const result = await service.get(input.userId, input.token);

    expect(result).toEqual(output);
  });
  it("Should not found user", async () => {
    userRepositoryMock.getByID.mockResolvedValue(new Error());

    const output = new Error("Usuário não encontrado");

    const result = await service.get(input.userId, input.token);

    expect(result).toEqual(output);
  });
  it("Should not match user", async () => {
    const token = {
      id: "teste",
      permissions: [],
    };

    userRepositoryMock.getByID.mockResolvedValue(savedUser);

    const output = new Error("Usuário não corresponde ao login");

    const result = await service.get(input.userId, token);

    expect(result).toEqual(output);
  });
  it("Should not found ascents", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    ascentRepositoryMock.getAll.mockResolvedValue(new Error());

    const result = await service.get(input.userId, input.token);

    expect(result).toBeInstanceOf(Error);
  });
  it("Should not get boulders", async () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    ascentRepositoryMock.getAll.mockResolvedValue(savedAscent);
    boulderRepositoryMock.getAll.mockResolvedValue(new Error());

    const result = await service.get(input.userId, input.token);

    expect(result).toBeInstanceOf(Error);
  });
});
describe("Delete - Ascent usecase service", () => {
  const input = {
    userId: "teste",
    boulderId: "teste",
    token: {
      id: "123",
      permissions: [],
    },
  };
  it("Should delete ascent", () => {
    userRepositoryMock.getByID.mockResolvedValue(savedUser);
    boulderRepositoryMock.getByID.mockResolvedValue(savedBoulder);
    ascentRepositoryMock.delete.mockResolvedValue(savedAscent);
    boulderRepositoryMock.update.mockResolvedValue(savedBoulder);
    userRepositoryMock.update.mockResolvedValue(savedUser);

    const result = service.delete(input.userId, input.boulderId, input.token);

    expect(result).not.toBeInstanceOf(Error);
  });
});
