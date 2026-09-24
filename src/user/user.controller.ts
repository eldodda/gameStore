import type { NextFunction, Request, Response } from "express";
import type { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userServ: UserService) {}

  async criarUser(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;
    try {
      const userCriado = await this.userServ.createUser(dados);
      res.status(201).json(userCriado);
    } catch (err) {
      next(err);
    }
  }

  async listarUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userServ.listUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async buscarUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await this.userServ.findUser(String(id));
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async atualizarUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const dados = req.body;
    try {
      const userAtualizado = await this.userServ.updateUser(String(id), dados);
      res.status(200).json(userAtualizado);
    } catch (err) {
      next(err);
    }
  }

  async apagarUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this.userServ.deleteUser(String(id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
