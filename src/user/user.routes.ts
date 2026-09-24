import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const userRepo = new UserRepository();
const userServ = new UserService(userRepo);
const userCtrl = new UserController(userServ);

export const routeUsers = Router();

routeUsers
  .post("/users", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.criarUser(req, res, next);
  })
  .get("/users", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.listarUsers(req, res, next);
  })
  .get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.buscarUser(req, res, next);
  })
  .put("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.atualizarUser(req, res, next);
  })
  .delete("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    userCtrl.apagarUser(req, res, next);
  });
