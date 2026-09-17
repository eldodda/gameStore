import z from "zod";

export const inUserSchema = z.object({
  nome: z.string().min(1).max(100),
  email: z.string().email(),
  senha: z.string().min(10).max(255),
  telefone: z
    .string()
    .regex(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "Telefone inválido",
    ),
  endereco: z.string().min(1).max(255),
});

export const outUserSchema = z.array(
  z.object({
    id: z.uuidv7(),
    nome: z.string().min(1).max(100),
    email: z.email(),
    senha: z.string().min(10).max(255),
    telefone: z
      .string()
      .regex(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm),
    endereco: z.string().min(1).max(255),
  }),
);

export type inUser = z.infer<typeof inUserSchema>;
export type outUser = z.infer<typeof outUserSchema>;
export const outUserArr = z.array(outUserSchema);
