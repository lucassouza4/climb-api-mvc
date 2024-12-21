import Redis from "ioredis";

const createRedisClient = async (): Promise<Redis> => {
  const client = new Redis(process.env.REDIS_URL + "?family=0");

  await client.ping();

  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  return client;
};

export default createRedisClient;
