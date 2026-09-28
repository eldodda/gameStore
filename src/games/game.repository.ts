import { prisma } from "../db/config";
import type { inGame, updateGame } from "./game.schema";

export class GameRepository {
  async new(data: any) {
    return await prisma.games.create({
      data,
    });
  }

  async list() {
    return await prisma.games.findMany();
  }

  async find(id: string) {
    return await prisma.games.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: updateGame) {
    return await prisma.games.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const deleted = await prisma.games.deleteMany({ where: { id } });
    return deleted;
  }
}
