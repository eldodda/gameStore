import type { inUser, updateUser, outUser } from "./user.schema";

export interface IUserDb {
  save(data: inUser): Promise<outUser>;
  list(): Promise<outUser[]>;
  find(id: string): Promise<outUser | null>;
  update(id: string, data: updateUser): Promise<outUser>;
  delete(id: string): Promise<{}>;
}
