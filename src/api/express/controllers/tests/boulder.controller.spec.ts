import { prisma } from "../../../../util/prisma.util";

jest.mock("../../../../util/prisma.util");

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("Boulder controller", () => {
  it("Should create boulder", async () => {});
});
