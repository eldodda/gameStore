import * as path from "path";
import { promises as fs } from "fs";
import { Migrator, FileMigrationProvider } from "kysely/migration";
import { db } from "./database";
async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(import.meta.dirname, "./migrations/"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration "${it.migrationName}" executada com sucesso!`);
    } else if (it.status === "Error") {
      console.error(`Falha ao executar a migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("Erro ao rodar migrations:", error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
