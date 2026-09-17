import type { NextFunction, Request, Response } from "express";
import type { UserService } from "./user.service.js";

export class UserController {
  constructor(private readonly userServ: UserService) {}

  async novoUser(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;
    try {
      const novoUsuario = await this.userServ.createUser(dados);
      res.status(201).json(novoUsuario);
    } catch (err) {
      next(err);
    }
  }
}
