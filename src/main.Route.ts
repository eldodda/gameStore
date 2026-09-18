import { Router } from "express";
import { userRoute } from "./user/user.routes.js";
import { errorHandler } from "./utils/errors/errorHandler.js";

export const mainRoute = Router();

mainRoute.use(userRoute);
mainRoute.use(errorHandler);
