import { Boulder, BoulderProps } from "../boulder/boulder";

describe("Boulder entity test", () => {
  it("Should create a boulder with()", () => {
    const input: BoulderProps = {
      id: "test",
      name: "test",
      sector: "test",
      city: "test",
      difficulty: 0,
      ascents: 0,
    };

    const boulder = Boulder.with(
      input.id,
      input.name,
      input.sector,
      input.city,
      input.difficulty,
      input.ascents
    );

    expect(boulder).toBeInstanceOf(Boulder);
  });

  it("Should not create a boulder with()", () => {
    const input: BoulderProps = {
      id: "test",
      name: "test",
      sector: "test",
      city: "test",
      difficulty: -1,
      ascents: 0,
    };

    const boulder = Boulder.with(
      input.id,
      input.name,
      input.sector,
      input.city,
      input.difficulty,
      input.ascents
    );

    expect(boulder).toBeInstanceOf(Error);
  });

  it("Should not create a boulder with()", () => {
    const input: BoulderProps = {
      id: "test",
      name: "test",
      sector: "test",
      city: "test",
      difficulty: 0,
      ascents: -10,
    };

    const boulder = Boulder.with(
      input.id,
      input.name,
      input.sector,
      input.city,
      input.difficulty,
      input.ascents
    );

    expect(boulder).toBeInstanceOf(Error);
  });

  it("Should create a boulder create()", () => {
    const input = {
      name: "test",
      sector: "test",
      city: "test",
      difficulty: 0,
    };

    const boulder = Boulder.build(
      input.name,
      input.sector,
      input.city,
      input.difficulty
    );

    expect(boulder).toBeInstanceOf(Boulder);
  });

  it("Should not create a boulder create()", () => {
    const input = {
      name: "test",
      sector: "test",
      city: "test",
      difficulty: -10,
    };

    const boulder = Boulder.build(
      input.name,
      input.sector,
      input.city,
      input.difficulty
    );

    expect(boulder).toBeInstanceOf(Error);
  });

  it("Should increase ascents", () => {
    const input = {
      name: "test",
      sector: "test",
      city: "test",
      difficulty: 0,
    };

    const boulder = Boulder.build(
      input.name,
      input.sector,
      input.city,
      input.difficulty
    ) as Boulder;

    boulder.encreaseAscents();
    expect(boulder.ascents).toEqual(1);
  });
  it("Should decrease ascents", () => {
    const input = {
      name: "test",
      sector: "test",
      city: "test",
      difficulty: 0,
    };

    const boulder = Boulder.build(
      input.name,
      input.sector,
      input.city,
      input.difficulty
    ) as Boulder;

    boulder.encreaseAscents();
    boulder.decreaseAscents();
    expect(boulder.ascents).toEqual(0);
  });
});
