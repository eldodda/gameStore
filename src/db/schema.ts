import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const users = pgTable("users", {
  id: varchar({ length: 255 })
    .$default(() => uuidv7())
    .primaryKey(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  senha: varchar({ length: 255 }).notNull(),
  telefone: varchar({ length: 11 }).notNull(),
  endereco: varchar(),
});
