import { randomUUIDv7 } from "crypto";
import { AppError } from "../../utils/errors/AppError";
import { ZodVal } from "../../utils/ZodVals";
import type { IGameDb } from "./game-db.interface";
import { converterValor, converterValorEmArr } from "../../utils/moneyCon";

const zodVal = new ZodVal();

export class GameService {
  constructor(private readonly gameRepo: IGameDb) {}

  async createGame(data: object) {
    const dados = data;
    const id = randomUUIDv7();
    const game = { id: id, ...dados };
    const valiData = zodVal.inGame(game);
    const novoJogo = await this.gameRepo.save(valiData);
    return converterValor(novoJogo);
  }

  async listGames() {
    const gamesList = await this.gameRepo.list();
    const validList = zodVal.outGameList(gamesList);
    return converterValorEmArr(validList);
  }

  async findGame(id: string) {
    const game = await this.gameRepo.find(id);
    if (!game) throw new AppError(404, "Nenhum jogo encontrado com esse ID.");
    const validGame = zodVal.outGame(game);
    return converterValor(validGame);
  }

  async updateGame(id: string, data: object) {
    const gameToUpdate = await this.gameRepo.find(id);
    if (!gameToUpdate)
      throw new AppError(404, "Nenhum jogo encontrado com esse ID.");
    const dataToUpdate = zodVal.inUpdateGame(data);
    const atualizado = await this.gameRepo.update(id, dataToUpdate);
    return converterValor(atualizado);
  }

  async deleteGame(id: string) {
    const gameToDelete = await this.gameRepo.find(id);
    if (!gameToDelete)
      throw new AppError(404, "Nenhum jogo encontrado com esse ID.");
    return await this.gameRepo.delete(id);
  }
}
