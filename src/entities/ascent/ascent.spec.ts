import { Ascent, AscentProps } from "./ascent";

const input: AscentProps = {
  id: "teste",
  userId: "teste",
  boulderId: "teste",
};

describe("Ascent entity test", () => {
  it("Should creat ascent with()", () => {
    const ascent = Ascent.with(input.id, input.userId, input.boulderId);

    expect(ascent).toBeInstanceOf(Ascent);
    expect(ascent.props).toEqual(input);
  });
  it("Should creat ascent build()", () => {
    const ascent = Ascent.build(input.userId, input.boulderId);

    expect(ascent).toBeInstanceOf(Ascent);
    expect(ascent.userId).toEqual(input.userId);
    expect(ascent.boulderId).toEqual(input.boulderId);
  });
});
