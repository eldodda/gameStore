import { hashearSenha } from "../utils/hashSenha.js";
import { ZodVals } from "../utils/zodVals.js";
import type { UserRepository } from "./user.repository.js";

const zod = new ZodVals();

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(dados: any) {
    let { senha, ...novoUser } = dados;
    const hashSenha = await hashearSenha(senha);
    novoUser = { ...novoUser, senha: hashSenha };
    const userValidado = zod.inUserVal(novoUser);
    return await this.userRepo.save(userValidado);
  }
}
