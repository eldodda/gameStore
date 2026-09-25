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
  .post("/users", async (req: Request, res: Response, next: NextFunction) => {
    await userCtrl.criarUser(req, res, next);
  })
  .get("/users", async (req: Request, res: Response, next: NextFunction) => {
    await userCtrl.listarUsers(req, res, next);
  })
  .get(
    "/users/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      await userCtrl.buscarUser(req, res, next);
    },
  )
  .put(
    "/users/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      await userCtrl.atualizarUser(req, res, next);
    },
  )
  .delete(
    "/users/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      await userCtrl.apagarUser(req, res, next);
    },
  );
