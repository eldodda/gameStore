import { Router } from "express";
import { errorHandler } from "./utils/errors/errorHandler";
import { routeUsers } from "./user/user.routes";
import { routeGames } from "./games/game.routes";

export const mainRoute = Router();

mainRoute.use(routeUsers, routeGames);
mainRoute.use(errorHandler);
