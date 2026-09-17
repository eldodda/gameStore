import type { ErrorRequestHandler, Request, Response } from "express";
import { AppError } from "./AppError.js";
import z, { ZodError } from "zod";

const zPretty = z.prettifyError;

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
) => {
  console.error("<======ERRO======>", error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "erro",
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      status: "dados_invalidos",
      message: "Dados inválidos enviados na requisição",
      errors: zPretty ? zPretty(error) : error.format,
    });
  }

  return res.status(500).json({
    status: "erro",
    message: "Erro interno do servidor.",
  });
};
