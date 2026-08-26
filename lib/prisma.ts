import { PrismaClient } from "@prisma/client";
import { getPrismaClientOptions } from "@/lib/prisma-options";

const prismaClientSingleton = () => {
  return new PrismaClient({
    ...getPrismaClientOptions(),
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
