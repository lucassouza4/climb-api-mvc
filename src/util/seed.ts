import { PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Dados iniciais a serem inseridos
  const boulders = [
    {
      id: "b19e247f-6edc-4ebf-bf75-c01a215819ba",
      name: "SIDARTA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "c7a57c08-3147-4ec2-a111-8d82cc2baff0",
      name: "DOCE DE LEITE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "13d96d1e-9142-415f-b82a-2ee726088c56",
      name: "HORA DA JANTA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "56480093-d89a-4ec0-b01b-2656a01bbefb",
      name: "JOÃO DE BARRO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "b74fc29b-d5c0-4946-a209-59df143a680c",
      name: "MONTE MOR",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "d8c28328-397b-495d-896c-eb39708b20fc",
      name: "FALHA HUMANA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "34ae545e-a985-416d-9c29-a4ac30e5f243",
      name: "SAUNA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "25a4bce6-eafb-4e86-b95b-b9d46868c39a",
      name: "RAIDEN",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "f9660fab-b020-4a89-b2af-639ddc68f8e4",
      name: "FLAP",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "bfb19dab-8e57-4b4c-93f7-29d500588b01",
      name: "ORAI-POR-NOIX",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 5,
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
      id: "c2e2f0b2-2a66-4c1a-bb71-614cb540c1c5",
      name: "DEEP INSIDE EXT",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
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
      id: "a3f3aafc-bd40-4e7e-bb1b-4f2d9c9e1f1d",
      name: "ARESTIDES EXT",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
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
      id: "b3c12bc4c-4f95-bc87-6d3fc1ddc1b",
      name: "CADENA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 4,
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
      id: "c72a2c7b-8b6e-4c57-9f4d-4b0b7a429e8f",
      name: "PROMOÇÃO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "6f4e4591-eb3d-44bc-9c5c-1e497209c202",
      name: "PRAMOCINHA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
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
      id: "cbbc7a89-1039-48d5-baf2-27d789a2542a",
      name: "SUB-ZERO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 6,
      ascents: 0,
    },
    {
      id: "6070846c-d03c-4c32-98d5-837aa010eae7",
      name: "LAGARTIXA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "732a1b5f-99bf-4060-a63c-9a8240e94890",
      name: "BABALO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "97ab184d-9f9b-40b6-9d87-fcf158864114",
      name: "CONHAQUE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "ce84f68e-e4a8-4639-8b3f-756379563955",
      name: "CARCOMENDO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "11547b33-1aed-4e76-9725-50ed7965fbc0",
      name: "ORA-PRO-NÓBIS",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "d86b9a76-b2c2-450d-8f93-9388d134e608",
      name: "QUEBRA GALHO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "92f9ef5f-3121-45b5-aa4e-9812ee91d0a9",
      name: "CAMALEÃO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "564c5e4c-c107-4dcb-b0b3-d0f38a8b61db",
      name: "GUERREIRO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "78efe826-76f0-4c9e-95ed-790f9828f9a7",
      name: "IRMÃOS CORAGEM",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "d507b689-685f-404f-9cc8-90f34b3e443e",
      name: "IRMÃOS NA VIBE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "48c0500a-c4d2-428a-b830-a41d83cd2229",
      name: "MORTAL KOMBAT",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "357c5211-87ae-4e94-a1d3-1892b2275882",
      name: "ORA-PRA-JAH",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "6e6b81cd-a061-4c73-af1c-602c484b602b",
      name: "PEDRA QUEIMADA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "2f4f374f-d63c-422d-ae0f-0d44df40834b",
      name: "PEDRA QUEIMADA SDS",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "8f9d3791-5a2d-4a54-bb8c-9b2f8b518381",
      name: "LAGARXA SEM RABO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "a4f7d96a-bb83-4c8f-8715-57b160ae0d91",
      name: "RABO DE CAMALEÃO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "b9f56a47-166d-4317-a421-51de8c4f225a",
      name: "GEOTERAPIA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "43043f5a-0b6f-4578-92e0-ca6b432355b3",
      name: "ESCRAVOS DA PEDRA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "dc956158-4d61-498f-acd1-be44e20b2189",
      name: "TETO DE VIDRO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "3275e880-ef6a-4df0-a91d-72e7edff5956",
      name: "DEEP INSIDE",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "f054e7ac-4c45-4ed0-acda-287ea8b6a1f0",
      name: "PANAMÁ",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "cffdaffe-07a7-4809-ae15-d7b9acfe167e",
      name: "PROTESTO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "3b0507a4-879d-4e67-b8ac-103c35e7c164",
      name: "ORA-PROS-CRASH",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "637d581f-174c-447c-ab68-887595b0e69e",
      name: "ORATÓRIO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "5455cba7-f377-46c1-a29c-616c1810949d",
      name: "RABO DE LAGARXA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 10,
      ascents: 0,
    },
    {
      id: "745f554e-5b5e-477f-96cc-6e2435273d5f",
      name: "MAJOR",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "a5e2e60a-9938-41eb-ba77-98f85df34228",
      name: "TEIÚ",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "1e710c41-e467-446a-87b5-b96fa7e7ac12",
      name: "BUENA ONDA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "d58b0789-9ada-4199-a5a2-0f99729084a7",
      name: "OUROBOULDER",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "206024d6-70ad-4d2b-90f1-0e50da001618",
      name: "EU ACREDITO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 11,
      ascents: 0,
    },
    {
      id: "e43ddc0b-528e-4bd8-be1c-9c927886c02e",
      name: "CHICLETS",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 12,
      ascents: 0,
    },
    {
      id: "3930a3b9-5a50-4a64-b8de-3c7dc5bb9e3f",
      name: "NAVO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 12,
      ascents: 0,
    },
    {
      id: "5241658c-71fb-42b1-8060-28ab8b84593b",
      name: "DITADOR",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 13,
      ascents: 0,
    },
    {
      id: "5d4a947f-1109-4268-a119-05fb62d75e58",
      name: "CHAPEUZINHO VERMELHO",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 13,
      ascents: 0,
    },
    {
      id: "68958205-5382-4ac0-ad06-ccddbac75c8f",
      name: "CORONEL",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 13,
      ascents: 0,
    },
    {
      id: "bb6de17c-ae15-4712-a4b5-e55510d2121b",
      name: "GOLPE MILITAR",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 13,
      ascents: 0,
    },
    {
      id: "231d0e32-8052-475d-b4b1-08c8124cc757",
      name: "NAVOTERAPIA",
      city: "OURO PRETO",
      sector: "PEDREIRA",
      difficulty: 13,
      ascents: 0,
    },
    {
      id: "cbda7738-0e39-484a-b1c0-2e9eb2bb6203",
      name: "ALQUIMIA",
      city: "MILHO VERDE",
      sector: "sector CENTRAL",
      difficulty: 1,
      ascents: 0,
    },
    {
      id: "858a6970-bcae-408a-8747-de95f97857d4",
      name: "BRISA",
      city: "MILHO VERDE",
      sector: "sector CENTRAL",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "c880ba12-30ba-424a-ab23-cd25660122ca",
      name: "CAMINHO DO MEIO",
      city: "MILHO VERDE",
      sector: "sector CENTRAL",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "deef7a39-6876-4e8f-963f-47154a959d18",
      name: "PICO DE ANCESTRALIDADE",
      city: "MILHO VERDE",
      sector: "sector CENTRAL",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "bcaadde7-0886-44a9-85c9-b0e6f522aab2",
      name: "PEDRA DO OVO",
      city: "MILHO VERDE",
      sector: "sector CENTRAL",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "a94cef40-b452-4b4f-9d32-83dc26038692",
      name: "TRILHA DO SOL",
      city: "SÃO THOME DAS LETRAS",
      sector: "VALE DAS BORBOLETAS",
      difficulty: 2,
      ascents: 0,
    },
    {
      id: "a038ce9e-79a1-4755-8636-3ddc521d1b07",
      name: "DEDO DE DEUS",
      city: "SÃO THOME DAS LETRAS",
      sector: "VALE DAS BORBOLETAS",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "57efd193-5714-44aa-a1b2-588f412c181a",
      name: "MAR DE CRISTAIS",
      city: "SÃO THOME DAS LETRAS",
      sector: "VALE DAS BORBOLETAS",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "a8499ee9-5391-4b1d-a9ed-9a90a35a5959",
      name: "PEDRA ENCANTADA",
      city: "SÃO THOME DAS LETRAS",
      sector: "VALE DAS BORBOLETAS",
      difficulty: 6,
      ascents: 0,
    },
    {
      id: "7574bb19-63d9-4518-9956-eb2c38044e96",
      name: "HORIZONTE INFINITO",
      city: "SÃO THOME DAS LETRAS",
      sector: "VALE DAS BORBOLETAS",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "45b8977b-bb49-4837-8150-59052dfedce7",
      name: "PÃO DE QUEIJO",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 1,
      ascents: 0,
    },
    {
      id: "10bfe824-4fdd-4fde-8a71-27ad9d4609d6",
      name: "SAMBA NA GÁVEA",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 2,
      ascents: 0,
    },
    {
      id: "1274fb62-e6d3-4228-bbf0-4e8d2f52693c",
      name: "COSTÃO DO CORCOVADO",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "015841e1-223d-4f68-a3d8-6ef6a8349c34",
      name: "RODA GIGANTE",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "224f97d9-85fd-4146-876e-2dd4ca44afd3",
      name: "VERTIGEM",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "1c0ca54f-f4d2-4b71-b1b8-cc5281c6e390",
      name: "MAR VERMELHO",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 6,
      ascents: 0,
    },
    {
      id: "7ffc53ac-aae3-4ac1-a282-7964780b7859",
      name: "CÉU ABERTO",
      city: "RIO DE JANEIRO",
      sector: "CAMPO ESCOLA 2000",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "69f1e561-215a-43e7-8ec9-65fa1afe56c5",
      name: "VIA DA AMIZADE",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 2,
      ascents: 0,
    },
    {
      id: "42f07cf8-f9e1-494f-9ec7-0b08586e161d",
      name: "SOL DE INVERNO",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 4,
      ascents: 0,
    },
    {
      id: "fd50b92f-7d87-4966-bb9f-b3714ef7c3ea",
      name: "CACHOEIRINHA",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "ab4f6820-e8a3-44f3-8a06-b0020f8da467",
      name: "PEDRA DO GUARDIÃO",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 6,
      ascents: 0,
    },
    {
      id: "bd59264f-e071-479c-ba51-844bdc5152f1",
      name: "MIRANTE",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "27ab435b-eaed-4fe3-a9f9-0f4a9f9f3aa1",
      name: "VERTIGEM NOTURNA",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "e9960278-1c4b-4b24-afce-df9c0e02b562",
      name: "TRAVESSIA DOS VENTOS",
      city: "RIO DE JANEIRO",
      sector: "FALÉSIA",
      difficulty: 9,
      ascents: 0,
    },
    {
      id: "0f5c0c8a-9984-4a26-ae82-ce021eeb3166",
      name: "CAMINHO DAS ESTRELAS",
      city: "RIO DE JANEIRO",
      sector: "PEDRA BONITA",
      difficulty: 3,
      ascents: 0,
    },
    {
      id: "3299276b-3863-437e-ba71-01f532b7f32e",
      name: "TOQUE DE MIDAS",
      city: "RIO DE JANEIRO",
      sector: "PEDRA BONITA",
      difficulty: 5,
      ascents: 0,
    },
    {
      id: "1ae13d53-4a88-4a46-b4a1-9c115c91d92a",
      name: "PEDRA DO ELEFANTE",
      city: "RIO DE JANEIRO",
      sector: "PEDRA BONITA",
      difficulty: 6,
      ascents: 0,
    },
    {
      id: "39d53aa0-5b94-4b90-ad68-e73618549d09",
      name: "LUZ E SOMBRA",
      city: "RIO DE JANEIRO",
      sector: "PEDRA BONITA",
      difficulty: 7,
      ascents: 0,
    },
    {
      id: "95ce1471-ef99-4a13-bc8e-519855d6493c",
      name: "RUMO AO INFINITO",
      city: "RIO DE JANEIRO",
      sector: "PEDRA BONITA",
      difficulty: 8,
      ascents: 0,
    },
    {
      id: "9a6358d5-81f3-4d8a-af5e-03417b3a5c0e",
      name: "DESPERTAR DOS SONHOS",
      city: "RIO DE JANEIRO",
      sector: "PEDRA BONITA",
      difficulty: 9,
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
      score: 0,
      password: "123456",
    },
    {
      id: "c32c7aba-a7bf-4015-8f7a-6eb6c911e02d",
      type: Type.BASIC,
      name: "Diboia",
      email: "diboia@gmail.com",
      score: 0,
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
