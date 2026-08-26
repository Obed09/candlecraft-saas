import { PrismaClient } from "@prisma/client";
import { buildPoolerUrl } from "@/lib/prisma-options";

const poolerUrl = buildPoolerUrl(process.env.DATABASE_URL);

const prismaClientSingleton = () => {
  return new PrismaClient({
    ...(poolerUrl ? { datasourceUrl: poolerUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
