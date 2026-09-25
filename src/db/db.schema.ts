import {
  type Generated,
  type Insertable,
  type Selectable,
  type Updateable,
} from "kysely";

export interface Schema {
  users: User;
}
export interface User {
  id: Generated<string>;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
}

export type user = Selectable<User>;
export type newUser = Insertable<User>;
export type updateUser = Updateable<User>;
