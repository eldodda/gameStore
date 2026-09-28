import { AppError } from "../utils/errors/AppError";
import { ZodVal } from "../utils/ZodVals";
import type { GameRepository } from "./game.repository";

const zodVal = new ZodVal();

export class GameService {
  constructor(private readonly gameRepo: GameRepository) {}

  async createGame(data: object) {
    const dados = data;
    const valiData = zodVal.inGame(dados);
    return await this.gameRepo.new(valiData);
  }

  async listGames() {
    const gamesList = await this.gameRepo.list();
    const validList = zodVal.outGameList(gamesList);
    return validList;
  }

  async findGame(id: string) {
    const game = await this.gameRepo.find(id);
    if (!game) throw new AppError(404, "Nenhum jogo encontrado com esse ID.");
    const validGame = zodVal.outGame(game);
    return validGame;
  }

  async updateGame(id: string, data: object) {
    const gameToUpdate = await this.gameRepo.find(id);
    if (!gameToUpdate)
      throw new AppError(404, "Nenhum jogo encontrado com esse ID.");
    const dataToUpdate = zodVal.inUpdateGame(data);
    return await this.gameRepo.update(id, dataToUpdate);
  }

  async deleteGame(id: string) {
    const gameToDelete = await this.gameRepo.find(id);
    if (!gameToDelete)
      throw new AppError(404, "Nenhum jogo encontrado com esse ID.");
    return await this.gameRepo.delete(id);
  }
}
