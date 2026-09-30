import { makeGameCtrl } from "../../utils/errors/instanceFactory";
import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";

const gameCtrl = makeGameCtrl();
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
