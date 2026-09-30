import { hash } from "bcrypt";

export function hashSenha(senha: string) {
  const salt = 10;
  const hashed = hash(senha, salt);
  return hashed;
}
