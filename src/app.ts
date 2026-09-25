import express from "express";
import "dotenv/config";
import { mainRoute } from "./main.route";
import { client, testarConexao } from "./db/database";
import { errorHandler } from "./utils/errors/errorHandler";

const app = express();

app.use(express.json());

app.use(mainRoute);
app.use(errorHandler);
client.connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await testarConexao();
  console.log(`Servidor rodando na porta ${PORT}.`);
});
