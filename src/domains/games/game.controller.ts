import type { NextFunction, Request, Response } from "express";
import type { GameService } from "./game.service";

export class GameController {
  constructor(private readonly userServ: GameService) {}

  async criarGame(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;
    try {
      const userCriado = await this.userServ.createGame(dados);
      res.status(201).json(userCriado);
    } catch (err) {
      next(err);
    }
  }

  async listarGames(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userServ.listGames();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async buscarGame(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await this.userServ.findGame(String(id));
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async atualizarGame(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const dados = req.body;
    try {
      const userAtualizado = await this.userServ.updateGame(String(id), dados);
      res.status(200).json(userAtualizado);
    } catch (err) {
      next(err);
    }
  }

  async apagarGame(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this.userServ.deleteGame(String(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
