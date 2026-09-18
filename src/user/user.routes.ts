import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { UserController } from "./user.controller.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

const userRepo = new UserRepository();
const userServ = new UserService(userRepo);
const userCtrl = new UserController(userServ);

export const userRoute = Router();

userRoute
  .get("/users", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.listarUsers(req, res, next);
  })
  .get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.encontrarUser(req, res, next);
  })
  .post("/users", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.criarUser(req, res, next);
  })
  .put("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.atualizarUser(req, res, next);
  });
