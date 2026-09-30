import z from "zod";

export const gameSchema = z.object({
  id: z.uuidv7(),
  nome: z.string().min(1).max(255),
  plataforma: z.string().min(1),
  descricao: z.string().min(5).nullable(),
  valor: z.int().min(2500),
});

export const updateGameSchema = z.object({
  nome: z.string().min(1).max(255).optional(),
  plataforma: z.string().min(1).optional(),
  descricao: z.string().min(5).optional(),
  valor: z.int().min(2500).optional(),
});

export type inGame = z.infer<typeof gameSchema>;
export type outGame = z.infer<typeof gameSchema>;
export type updateGame = z.infer<typeof updateGameSchema>;
export const outGameArr = z.array(gameSchema);
