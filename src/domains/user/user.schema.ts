import z from "zod";

const userRole = z.enum(["CLIENT", "ADMIN"]);

export const userSchema = z.object({
  id: z.uuidv7(),
  nome: z.string(),
  email: z.email(),
  senha: z.string(),
  role: userRole.default("CLIENT"),
  telefone: z.string(), //  TODO: Criar regex de telefone brasileiro
  endereco: z.string(),
  created_at: z.date(),
});

export const inUserSchema = userSchema.omit({ created_at: true });

export const updateUserSchema = userSchema
  .partial()
  .omit({ id: true, email: true, senha: true });

export const outUserSchema = userSchema.omit({ senha: true });

export type user = z.infer<typeof userSchema>;
export type inUser = z.infer<typeof inUserSchema>;
export type updateUser = z.infer<typeof updateUserSchema>;
export type outUser = z.infer<typeof outUserSchema>;
export const outUserArr = z.array(outUserSchema);
