import { Router } from "express";
import { routeUsers } from "./user/user.routes";

export const mainRoute = Router();

mainRoute.use(routeUsers);
