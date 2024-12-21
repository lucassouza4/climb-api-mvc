import Redis from "ioredis";

const createRedisClient = (): Redis => {
  const client = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    password: process.env.REDIS_PASSWORD || "",
  });

  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  return client;
};

export default createRedisClient;
