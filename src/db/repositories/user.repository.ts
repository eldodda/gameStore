import { prisma } from "../../db/prisma.config";
import type { IUserDb } from "../../domains/user/user-db.interface";
import type {
  inUser,
  outUser,
  updateUser,
  user,
} from "../../domains/user/user.schema";

export class UserRepository implements IUserDb {
  async save(data: inUser): Promise<outUser> {
    return await prisma.users.create({
      data,
      omit: { senha: true },
    });
  }

  async list(): Promise<outUser[]> {
    return await prisma.users.findMany({
      omit: { senha: true },
      orderBy: { id: "asc" },
    });
  }

  async find(id: string): Promise<outUser | null> {
    return await prisma.users.findUnique({
      where: { id },
      omit: {
        senha: true,
      },
    });
  }

  async update(id: string, data: updateUser): Promise<outUser> {
    return await prisma.users.update({
      where: { id },
      data,
      omit: {
        senha: true,
      },
    });
  }

  async delete(id: string): Promise<{}> {
    const deleted = await prisma.users.deleteMany({ where: { id } });
    return deleted;
  }
}
