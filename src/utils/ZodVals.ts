import {
  inGameSchema,
  outGameArr,
  outGameSchema,
  updateGameSchema,
} from "../games/game.schema";
import {
  inUserSchema,
  outUserArr,
  outUserSchema,
  updateUserSchema,
} from "../user/user.schema";

export class ZodVal {
  inUser(dados: unknown) {
    return inUserSchema.parse(dados);
  }

  inUpdateUser(dados: unknown) {
    return updateUserSchema.parse(dados);
  }

  outUserList(dados: unknown) {
    return outUserArr.parse(dados);
  }

  outUser(dados: unknown) {
    return outUserSchema.parse(dados);
  }

  inGame(dados: unknown) {
    return inGameSchema.parse(dados);
  }

  inUpdateGame(dados: unknown) {
    return updateGameSchema.parse(dados);
  }

  outGameList(dados: unknown) {
    return outGameArr.parse(dados);
  }

  outGame(dados: unknown) {
    return outGameSchema.parse(dados);
  }
}
