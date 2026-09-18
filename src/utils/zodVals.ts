import {
  inUserSchema,
  outUserSchema,
  outUserArr,
  updateUserSchema,
} from "../user/user.schema.js";

export class UserVals {
  inUserVal(dados: unknown) {
    return inUserSchema.parse(dados);
  }

  outUserVal(dados: unknown) {
    return outUserSchema.parse(dados);
  }

  outUserListVal(dados: unknown) {
    return outUserArr.parse(dados);
  }

  updateUserVal(dados: unknown) {
    return updateUserSchema.parse(dados);
  }
}
