import { hash } from "bcrypt";
import { AppError } from "./errors/AppError.js";

export async function hashearSenha(senha: string): Promise<string> {
  const salt = 10;
  try {
    return await hash(senha, salt);
  } catch (err) {
    throw new AppError(500, "Erro no processamento da senha.");
  }
}
