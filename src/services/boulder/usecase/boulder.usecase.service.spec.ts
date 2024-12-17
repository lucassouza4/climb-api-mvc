import { BoulderUsecaseService } from "./boulder.usecase.service";
import { boulderRepositoryMock } from "../../../util/mocks/prismaClient";
import { Boulder } from "../../../entities/boulder/boulder";
import { BoulderRepository } from "../../../repositories/boulder/boulder.repository";

let service: BoulderUsecaseService;

beforeEach(() => {
  service = BoulderUsecaseService.build(
    boulderRepositoryMock as BoulderRepository
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
    const { name, sector, city, difficulty } = Boulder.build(
      input.name,
      input.sector,
      input.city,
      input.difficulty
    ) as Boulder;
    const savedBoulder = {
      name,
      sector,
      city,
      difficulty,
      id: "123",
      ascents: 0,
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

    const result = await service.create(
      input.name,
      input.difficulty,
      input.sector,
      input.city
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
    const savedBoulder = Boulder.build(
      input.name,
      input.sector,
      input.city,
      input.difficulty
    );

    boulderRepositoryMock.get.mockResolvedValue(savedBoulder);

    const result = await service.create(
      input.name,
      input.difficulty,
      input.sector,
      input.city
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

    const result = await service.create(
      input.name,
      input.difficulty,
      input.sector,
      input.city
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

    const result = await service.create(
      input.name,
      input.difficulty,
      input.sector,
      input.city
    );

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.get).toHaveBeenCalledWith(input);
  });
});

describe("List - Boulder usecase service", () => {
  it("should list boulders", async () => {
    const boulders = [
      Boulder.build("Boulder 1", "Sector 1", "City 1", 5) as Boulder,
      Boulder.build("Boulder 2", "Sector 2", "City 2", 6) as Boulder,
    ];

    boulderRepositoryMock.getAll.mockResolvedValue(boulders);

    const result = await service.list();

    expect(result).toEqual({
      boulders: [
        {
          id: boulders[0].id,
          name: boulders[0].name,
          difficulty: boulders[0].difficulty,
          sector: boulders[0].sector,
          city: boulders[0].city,
          ascents: boulders[0].ascents,
        },
        {
          id: boulders[1].id,
          name: boulders[1].name,
          difficulty: boulders[1].difficulty,
          sector: boulders[1].sector,
          city: boulders[1].city,
          ascents: boulders[1].ascents,
        },
      ],
    });
    expect(boulderRepositoryMock.getAll).toHaveBeenCalled();
  });

  it("should list boulders by params", async () => {
    const city = "test";
    const boulders = [
      Boulder.build("Boulder 1", "Sector 1", "City 1", 5) as Boulder,
      Boulder.build("Boulder 2", "Sector 2", "City 2", 6) as Boulder,
    ];

    boulderRepositoryMock.get.mockResolvedValue(boulders);

    const result = await service.list(undefined, undefined, undefined, city);

    expect(result).toEqual({
      boulders: [
        {
          id: boulders[0].id,
          name: boulders[0].name,
          difficulty: boulders[0].difficulty,
          sector: boulders[0].sector,
          city: boulders[0].city,
          ascents: boulders[0].ascents,
        },
        {
          id: boulders[1].id,
          name: boulders[1].name,
          difficulty: boulders[1].difficulty,
          sector: boulders[1].sector,
          city: boulders[1].city,
          ascents: boulders[1].ascents,
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

    const result = await service.list();

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.getAll).toHaveBeenCalled();
  });
});

describe("Get - Boulder usecase service", () => {
  it("should get a boulder", async () => {
    const id = "123";

    const { name, sector, city, difficulty } = Boulder.build(
      "test",
      "test",
      "test",
      0
    ) as Boulder;

    const boulder = {
      name,
      sector,
      city,
      difficulty,
      id: "123",
      ascents: 0,
    } as Boulder;

    boulderRepositoryMock.getByID.mockResolvedValue(boulder);

    const result = await service.get(id);

    expect(result).toEqual({
      id: boulder.id,
      name: boulder.name,
      city: boulder.city,
      sector: boulder.sector,
      difficulty: boulder.difficulty,
      ascents: boulder.ascents,
    });
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });

  it("should not get a boulder", async () => {
    const id = "123";

    boulderRepositoryMock.getByID.mockResolvedValue(new Error());

    const result = await service.get(id);

    expect(result).toBeInstanceOf(Error);
    expect(boulderRepositoryMock.getByID).toHaveBeenCalledWith(id);
  });
});
