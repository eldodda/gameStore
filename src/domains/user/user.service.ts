import { randomUUIDv7 } from "crypto";
import { AppError } from "../../utils/errors/AppError";
import { ZodVal } from "../../utils/ZodVals";
import type { IUserDb } from "./user-db.interface";
import { hashSenha } from "../../utils/passwdManager";

const zodVal = new ZodVal();

export class UserService {
  constructor(private readonly userRepo: IUserDb) {}

  async createUser(data: { senha: string }) {
    const { senha, ...dados } = data;
    const hashPass = await hashSenha(senha);
    const id = randomUUIDv7();
    const newUser = { id: id, senha: hashPass, ...dados };
    const valiData = zodVal.inUser(newUser);
    return await this.userRepo.save(valiData);
  }

  async listUsers() {
    const usersList = await this.userRepo.list();
    const validList = zodVal.outUserList(usersList);
    return validList;
  }

  async findUser(id: string) {
    const user = await this.userRepo.find(id);
    if (!user)
      throw new AppError(404, "Nenhum usuário encontrado com esse ID.");
    const validUser = zodVal.outUser(user);
    return validUser;
  }

  async updateUser(id: string, data: object) {
    const userToUpdate = await this.userRepo.find(id);
    if (!userToUpdate)
      throw new AppError(404, "Nenhum usuário encontrado com esse ID.");
    const dataToUpdate = zodVal.inUpdateUser(data);
    return await this.userRepo.update(id, dataToUpdate);
  }

  async deleteUser(id: string) {
    const userToDelete = await this.userRepo.find(id);
    if (!userToDelete)
      throw new AppError(404, "Nenhum usuário encontrado com esse ID.");
    return await this.userRepo.delete(id);
  }
}
