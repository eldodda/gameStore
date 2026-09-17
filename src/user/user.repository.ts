import { db } from "../app.js";
import { users } from "../db/schema.js";
import type { inUser } from "./user.schema.js";

export class UserRepository {
  async save(user: inUser) {
    return await db
      .insert(users)
      .values(user)
      .returning({ id: users.id, nome: users.nome, email: users.email });
  }
}
