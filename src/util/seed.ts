import { PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Dados iniciais a serem inseridos
  const boulders = [
    {
      id: "6f4e4591-eb3d-44bc-9c5c-1e497209c202",
      name: "PRAMOCINHA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "c72a2c7b-8b6e-4c57-9f4d-4b0b7a429e8f",
      name: "PROMOÇÃO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "a5d5cde7-adc5-4e83-9b88b8d2f3d4c73",
      name: "PAREDINHA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 0,
      ascents: 0,
    },
    {
      id: "b3c12bc4c-4f95-bc87-6d3fc1ddc1b",
      name: "CADENA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "dc1c6f7ef2e-4a6db-0e8b6f5c1b8d",
      name: "ARESTIDES",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "a3f3aafc-bd40-4e7e-bb1b-4f2d9c9e1f1d",
      name: "ARESTIDES EXT",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "f1c93e50-3b05-4c1e-93ae-bb6e3a62f9d6",
      name: "CANINDÉ",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "e79c0c1f-8e59-4c9e-a615-8c8c0b1c3e7c",
      name: "DEEP INSIDE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "c2e2f0b2-2a66-4c1a-bb71-614cb540c1c5",
      name: "DEEP INSIDE EXT",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "e1d2c5c2-47a3-4bdb-8b83-5de5b9f1e16c",
      name: "NATARAJA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 6,
      ascents: 0,
    },
    {
      id: "b4d2f1a4-60edb9e-8bcf-2e34c63e1c6e",
      name: "CANINDÉ DE CIMA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "6f4e4591-eb3d-44bc-9c5c-1e497209c201",
      name: "DOCE DE LEITE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 1,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      name: "SUBZERO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 6,
      ascents: 1,
    },
    {
      id: "b19e247f-6edc-4ebf-bf75-c01a215819ba",
      name: "SIDARTA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 5,
      ascents: 1,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb4",
      name: "HORA DA JANTA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb5",
      name: "FALHA HUMANA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb6",
      name: "MAJOR",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb7",
      name: "DITADOR",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 13,
      ascents: 0,
    },
  ];

  const users = [
    {
      id: "6f4e4591-eb3d-44bc-9c5c-1e497209c201",
      type: Type.BASIC,
      name: "Nakapa",
      email: "nakapa@gmail.com",
      score: 0,
      password: "1234",
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      type: Type.MASTER,
      name: "4iTrinta",
      email: "4iTrinta@gmail.com",
      score: 140,
      password: "123456",
    },
  ];

  const ascents = [
    {
      id: "6f4e4591-eb3d-44bc-9c5c-1e497209c201",
      userId: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      boulderId: "6f4e4591-eb3d-44bc-9c5c-1e497209c201",
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      userId: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      boulderId: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
    },
    {
      id: "b19e247f-6edc-4ebf-bf75-c01a215819ba",
      userId: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      boulderId: "b19e247f-6edc-4ebf-bf75-c01a215819ba",
    },
  ];
  // Inserindo os dados
  for (const boulder of boulders) {
    try {
      await prisma.boulder.create({
        data: boulder,
      });
    } catch (error) {
      console.error(`Erro ao inserir boulder ${boulder.id}:`, error);
    }
  }
  for (const user of users) {
    try {
      await prisma.user.create({
        data: user,
      });
    } catch (error) {
      console.error(`Erro ao inserir boulder ${user.id}:`, error);
    }
  }
  for (const ascent of ascents) {
    try {
      await prisma.ascent.create({
        data: ascent,
      });
    } catch (error) {
      console.error(`Erro ao inserir boulder ${ascent.id}:`, error);
    }
  }
}

main()
  .then(() => {
    console.log("Dados inseridos com sucesso.");
    process.exit(0);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
