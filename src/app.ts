import express from "express";
import "dotenv/config";
import { mainRoute } from "./main.Route.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";

const app = express();

app.use(express.json());

app.use(mainRoute);

export const db = drizzle(process.env.DATABASE_URL!);
try {
  const result = await db.execute(sql`SELECT 1 AS connected`);
  if (result.rows.length === 1) console.log("Banco de dados conectado.");
} catch (err) {
  console.error("Falha ao conectar no banco.");
  console.log(err);
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
