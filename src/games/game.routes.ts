import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { GameRepository } from "./game.repository";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";

const gameRepo = new GameRepository();
const gameServ = new GameService(gameRepo);
const gameCtrl = new GameController(gameServ);

export const routeGames = Router();

routeGames
  .post("/games", (req: Request, res: Response, next: NextFunction) => {
    gameCtrl.criarGame(req, res, next);
  })
  .get("/games", (req: Request, res: Response, next: NextFunction) => {
    gameCtrl.listarGames(req, res, next);
  })
  .get("/games/:id", (req: Request, res: Response, next: NextFunction) => {
    gameCtrl.buscarGame(req, res, next);
  })
  .put("/games/:id", (req: Request, res: Response, next: NextFunction) => {
    gameCtrl.atualizarGame(req, res, next);
  })
  .delete("/games/:id", (req: Request, res: Response, next: NextFunction) => {
    gameCtrl.apagarGame(req, res, next);
  });
