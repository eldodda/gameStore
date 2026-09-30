import { UserRepository } from "../../db/repositories/user.repository";
import { GameController } from "../../domains/games/game.controller";
import { GameRepository } from "../../db/repositories/game.repository";
import { GameService } from "../../domains/games/game.service";
import { UserController } from "../../domains/user/user.controller";
import { UserService } from "../../domains/user/user.service";

export function makeUserCtrl(): UserController {
  const userRepo = new UserRepository();
  const userServ = new UserService(userRepo);
  return new UserController(userServ);
}

export function makeGameCtrl(): GameController {
  const gameRepo = new GameRepository();
  const gameServ = new GameService(gameRepo);
  return new GameController(gameServ);
}
