import Redis from "ioredis";

const createRedisClient = (): Redis => {
  const client = new Redis(process.env.REDIS_URL || "127.0.0.1");

  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  return client;
};

export default createRedisClient;
