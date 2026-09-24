import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connection successful! PostgreSQL is connected via Prisma.");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

export { prisma, testConnection };
