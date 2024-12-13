import { BoulderUsecaseService } from "./boulder.usecase.service";
import { boulderRepositoryMock } from "../../../util/mocks/prismaClient";
import { Boulder } from "../../../entities/boulder";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";
import { secureHeapUsed } from "crypto";

let service: BoulderUsecaseService;

beforeEach(() => {
  service = BoulderUsecaseService.build(
    boulderRepositoryMock as BoulderRepository,
  );
  jest.clearAllMocks();
});

describe("Create - Boulder usecase service", () => {
  it("Should create boulder", async () => {
    const input = {
      name: "teste",
      sector: "teste",
      city: "teste",
      difficulty: 0,
    };
    const { Name, Sector, City, Difficulty } = Boulder.Create(
      input.name,
      input.sector,
      input.city,
      input.difficulty,
    ) as Boulder;
    const savedBoulder = {
      Name,
      Sector,
      City,
      Difficulty,
      Id: "123",
      Ascents: 0,
    } as Boulder;

    const output = {
      id: "123",
      name: "TESTE",
      difficulty: 0,
      sector: "TESTE",
      city: "TESTE",
      ascents: 0,
    };

    boulderRepositoryMock.get.mockResolvedValue([]);
    boulderRepositoryMock.save.mockResolvedValue(savedBoulder);

    const result = await service.Create(
      input.name,
      input.difficulty,
      input.sector,
      input.city,
    );

    expect(result).toEqual(output);
    expect(boulderRepositoryMock.get).toHaveBeenCalledWith(input);
  });

  it("Should not create a finded boulder", async () => {
    const input = {
      name: "teste",
      sector: "teste",
      city: "teste",
      difficulty: 0,
    };
    const savedBoulder = Boulder.Create(
      input.name,
      input.sector,
      input.city,
      input.difficulty,
    );

    boulderRepositoryMock.get.mockResolvedValue(savedBoulder);

    const result = await service.Create(
      input.name,
      input.difficulty,
      input.sector,
      input.city,
    );

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.get).toHaveBeenCalledWith(input);
  });

  it("Should not create a boulder", async () => {
    const input = {
      name: "teste",
      sector: "teste",
      city: "teste",
      difficulty: -10,
    };

    boulderRepositoryMock.get.mockResolvedValue([]);

    const result = await service.Create(
      input.name,
      input.difficulty,
      input.sector,
      input.city,
    );

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.get).toHaveBeenCalledWith(input);
  });

  it("Should not save a boulder", async () => {
    const input = {
      name: "teste",
      sector: "teste",
      city: "teste",
      difficulty: 0,
    };
    const savedBoulder = new Error();

    boulderRepositoryMock.save.mockResolvedValue(savedBoulder);

    const result = await service.Create(
      input.name,
      input.difficulty,
      input.sector,
      input.city,
    );

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.get).toHaveBeenCalledWith(input);
  });
});

describe("List - Boulder usecase service", () => {
  it("should list boulders", async () => {
    const boulders = [
      Boulder.Create("Boulder 1", "Sector 1", "City 1", 5) as Boulder,
      Boulder.Create("Boulder 2", "Sector 2", "City 2", 6) as Boulder,
    ];

    boulderRepositoryMock.getAll.mockResolvedValue(boulders);

    const result = await service.List();

    expect(result).toEqual({
      boulders: [
        {
          id: boulders[0].Id,
          name: boulders[0].Name,
          difficulty: boulders[0].Difficulty,
          sector: boulders[0].Sector,
          city: boulders[0].City,
          ascents: boulders[0].Ascents,
        },
        {
          id: boulders[1].Id,
          name: boulders[1].Name,
          difficulty: boulders[1].Difficulty,
          sector: boulders[1].Sector,
          city: boulders[1].City,
          ascents: boulders[1].Ascents,
        },
      ],
    });
    expect(boulderRepositoryMock.getAll).toHaveBeenCalled();
  });

  it("should list boulders by params", async () => {
    const city = "test";
    const boulders = [
      Boulder.Create("Boulder 1", "Sector 1", "City 1", 5) as Boulder,
      Boulder.Create("Boulder 2", "Sector 2", "City 2", 6) as Boulder,
    ];

    boulderRepositoryMock.get.mockResolvedValue(boulders);

    const result = await service.List(undefined, undefined, undefined, city);

    expect(result).toEqual({
      boulders: [
        {
          id: boulders[0].Id,
          name: boulders[0].Name,
          difficulty: boulders[0].Difficulty,
          sector: boulders[0].Sector,
          city: boulders[0].City,
          ascents: boulders[0].Ascents,
        },
        {
          id: boulders[1].Id,
          name: boulders[1].Name,
          difficulty: boulders[1].Difficulty,
          sector: boulders[1].Sector,
          city: boulders[1].City,
          ascents: boulders[1].Ascents,
        },
      ],
    });
    expect(boulderRepositoryMock.get).toHaveBeenCalledWith({
      name: undefined,
      city,
      sector: undefined,
      difficulty: undefined,
    });
  });

  it("should not list boulders", async () => {
    boulderRepositoryMock.getAll.mockResolvedValue(new Error());

    const result = await service.List();

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.getAll).toHaveBeenCalled();
  });
});

describe("Get - Boulder usecase service", () => {
  it("should get a boulder", async () => {
    const id = "123";

    const { Name, Sector, City, Difficulty } = Boulder.Create(
      "test",
      "test",
      "test",
      0,
    ) as Boulder;

    const boulder = {
      Name,
      Sector,
      City,
      Difficulty,
      Id: "123",
      Ascents: 0,
    } as Boulder;

    boulderRepositoryMock.getByID.mockResolvedValue(boulder);

    const result = await service.Get(id);

    expect(result).toEqual({
      id: boulder.Id,
      name: boulder.Name,
      city: boulder.City,
      sector: boulder.Sector,
      difficulty: boulder.Difficulty,
      ascents: boulder.Ascents,
    });
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });

  it("should not get a boulder", async () => {
    const id = "123";

    boulderRepositoryMock.getByID.mockResolvedValue(new Error());

    const result = await service.Get(id);

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });
});

describe("IncreaseAscents - Boulder usecase service", () => {
  it("Should increase ascents of a boulder", async () => {
    const id = "123";
    const boulder = Boulder.Create("test", "test", "test", 0) as Boulder;

    boulderRepositoryMock.getByID.mockResolvedValue(boulder);
    boulderRepositoryMock.update.mockResolvedValue(boulder);

    const result = await service.IncreaseAscents(id);

    expect(result).toEqual({
      id: boulder.Id,
      name: boulder.Name,
      city: boulder.City,
      sector: boulder.Sector,
      difficulty: boulder.Difficulty,
      ascents: boulder.Ascents,
    });
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
    expect(boulderRepositoryMock.update).toHaveBeenCalledWith(boulder);
  });

  it("Should not get boulder", async () => {
    const id = "123";
    const boulder = Boulder.Create("test", "test", "test", 0) as Boulder;

    boulderRepositoryMock.getByID.mockResolvedValue(new Error());

    const result = await service.IncreaseAscents(id);

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });

  it("Should not increase ascents of a boulder", async () => {
    const id = "123";
    const boulder = Boulder.Create("test", "test", "test", 0) as Boulder;

    boulderRepositoryMock.getByID.mockResolvedValue(boulder);
    boulderRepositoryMock.update.mockResolvedValue(new Error());

    const result = await service.IncreaseAscents(id);

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
    expect(boulderRepositoryMock.update).toHaveBeenCalledWith(boulder);
  });
});
