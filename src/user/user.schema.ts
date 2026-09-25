import z from "zod";

export const inUserSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.email(),
  senha: z.string(),
  telefone: z.string(), //  TODO: Criar regex de telefone brasileiro
  endereco: z.string(),
});

export const updateUserSchema = z.object({
  nome: z.string().optional(),
  email: z.email().optional(),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
});

export const outUserSchema = z
  .object({
    id: z.uuidv7(),
    nome: z.string(),
    email: z.email(),
  })
  .nullable();

export type inUser = z.infer<typeof inUserSchema>;
export type updateUser = z.infer<typeof updateUserSchema>;
export type outUser = z.infer<typeof outUserSchema>;
export const outUserArr = z.array(outUserSchema);
