import { prisma } from "../db/config";
import type { inUser, updateUser } from "./user.schema";

export class UserRepository {
  async new(data: any) {
    return await prisma.user.create({
      data,
      omit: { senha: true },
    });
  }

  async list() {
    return await prisma.user.findMany({
      select: { id: true, nome: true, email: true },
    });
  }

  async find(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      omit: {
        senha: true,
      },
    });
  }

  async update(id: string, data: updateUser) {
    return await prisma.user.update({
      where: { id },
      data,
      omit: {
        senha: true,
      },
    });
  }

  async delete(id: string) {
    const deleted = await prisma.user.deleteMany({ where: { id } });
    return deleted;
  }
}
