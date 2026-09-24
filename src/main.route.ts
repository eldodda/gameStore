import { Router } from "express";
import { errorHandler } from "./utils/errors/errorHandler";
import { routeUsers } from "./user/user.routes";

export const mainRoute = Router();

mainRoute.use(routeUsers);
mainRoute.use(errorHandler);
