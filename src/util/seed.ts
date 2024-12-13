import { PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Dados iniciais a serem inseridos
  const boulders = [
    {
      id: "6f4e4591-eb3d-44bc-9c5c-1e497209c201",
      name: "DOCE DE LEITE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 10,
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
      ascents: 3,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb4",
      name: "HORA DA JANTA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 5,
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb5",
      name: "FALHA HUMANA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
      ascents: 6,
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
      password: "1234",
    },
    {
      id: "9385130c-3d7e-4005-99d2-f3f36ae41bb3",
      type: Type.MASTER,
      name: "4iTrinta",
      email: "4iTrinta@gmail.com",
      password: "123456",
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
}

main()
  .then(() => {
    console.log("Dados inseridos com sucesso.");
    process.exit(0);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
