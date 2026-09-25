import "dotenv/config";
import { Kysely, PostgresDialect } from "kysely";
import pg, { Pool } from "pg";
import type { Schema } from "./db.schema";

const { Client } = pg;
const conString = process.env.DATABASE_URL;
export const client = new Client(conString); //  Client do node-postgres: gerencia a conexão.

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: conString,
    max: 1,
  }),
});

export const db = new Kysely<Schema>({ dialect }); // Instância do Kysely para usar nos Repositórios.

export async function testarConexao() {
  try {
    await client.query("SELECT NOW()");
    console.log("Conexão com o PostgreSQL bem-sucedida!");
  } catch (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro);
    process.exit(1);
  }
}
