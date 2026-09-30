import { prisma } from "../../db/prisma.config";
import type { IGameDb } from "../../domains/games/game-db.interface";
import type {
  inGame,
  outGame,
  updateGame,
} from "../../domains/games/game.schema";

export class GameRepository implements IGameDb {
  async save(data: inGame): Promise<outGame> {
    return await prisma.games.create({
      data,
    });
  }

  async list(): Promise<outGame[]> {
    return await prisma.games.findMany({ orderBy: { nome: "asc" } });
  }

  async find(id: string): Promise<outGame | null> {
    return await prisma.games.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: updateGame): Promise<outGame> {
    return await prisma.games.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<{}> {
    const deleted = await prisma.games.deleteMany({ where: { id } });
    return deleted;
  }
}
