import express from "express";
import "dotenv/config";
import { mainRoute } from "./main.route";
import { testConnection } from "./db/config";

const app = express();

app.use(express.json());

app.use(mainRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server running on port ${PORT}`);
});
