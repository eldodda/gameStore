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
}
