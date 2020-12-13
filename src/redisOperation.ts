import redis from "redis";
import dotenv from "dotenv";

dotenv.config();
export const redisClient = redis.createClient(process.env.REDIS_URL as string);

redisClient.on("error", function (error) {
  console.error(error);
});
