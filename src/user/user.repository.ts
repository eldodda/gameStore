import { prisma } from "../db/config";
import type { inUser, updateUser } from "./user.schema";

export class UserRepository {
  async new(data: any) {
    return await prisma.users.create({
      data,
      omit: { senha: true },
    });
  }

  async list() {
    return await prisma.users.findMany({
      select: { id: true, nome: true, email: true },
    });
  }

  async find(id: string) {
    return await prisma.users.findUnique({
      where: { id },
      omit: {
        senha: true,
      },
    });
  }

  async update(id: string, data: updateUser) {
    return await prisma.users.update({
      where: { id },
      data,
      omit: {
        senha: true,
      },
    });
  }

  async delete(id: string) {
    const deleted = await prisma.users.deleteMany({ where: { id } });
    return deleted;
  }
}
