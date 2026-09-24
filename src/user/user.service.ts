import { AppError } from "../utils/errors/AppError";
import { ZodVal } from "../utils/ZodVals";
import type { UserRepository } from "./user.repository";
import { hash } from "bcrypt";

const zodVal = new ZodVal();

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(data: { senha: string }) {
    const { senha, ...dados } = data;
    const hashPass = await hash(senha, 10);
    const newUser = { senha: hashPass, ...dados };
    const valiData = zodVal.inUser(newUser);
    return await this.userRepo.new(valiData);
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
