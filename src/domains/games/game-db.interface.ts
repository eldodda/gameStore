import type { inGame, outGame, updateGame } from "./game.schema";

export interface IGameDb {
  save(data: inGame): Promise<outGame>;
  list(): Promise<outGame[]>;
  find(id: string): Promise<outGame | null>;
  update(id: string, data: updateGame): Promise<outGame>;
  delete(id: string): Promise<{}>;
}
