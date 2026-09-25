import { db } from "../db/database";
import type { inUser, updateUser } from "./user.schema";

export class UserRepository {
  async new(data: inUser) {
    return await db
      .insertInto("users")
      .values(data)
      .returning(["id", "nome", "email", "telefone", "endereco"])
      .executeTakeFirstOrThrow();
  }

  async list() {
    return await db.selectFrom("users").select(["id", "nome", "email"]);
  }

  async find(id: string) {}

  async update(id: string, data: updateUser) {}

  async delete(id: string) {}
}
