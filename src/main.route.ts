import { Router } from "express";
import { errorHandler } from "./utils/errors/errorHandler";
import { routeUsers } from "./domains/user/user.routes";
import { routeGames } from "./domains/games/game.routes";

export const mainRoute = Router();

mainRoute.use(routeUsers, routeGames);
mainRoute.use(errorHandler);
