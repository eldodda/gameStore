import type { ErrorRequestHandler, Request, Response } from "express";
import { AppError } from "./AppError";
import z, { ZodError } from "zod";
import { NoResultError } from "kysely";
import { DatabaseError } from "pg";

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

  if (error instanceof NoResultError) {
    return res.status(404).json({
      status: "nao_encontrado",
      message: "Registro não encontrado.",
    });
  }

  if (error instanceof DatabaseError) {
    switch (error.code) {
      case "23505": {
        return res.status(409).json({
          status: "conflito",
          message: "Já existe um registro com os dados informados.",
          detail: error.detail,
        });
      }

      case "23503": {
        return res.status(400).json({
          status: "requisicao_invalida",
          message:
            "O registro referenciado não existe ou possui dependências ativas.",
        });
      }

      case "23502": {
        return res.status(400).json({
          status: "requisicao_invalida",
          message: `O campo '${error.column}' é obrigatório.`,
        });
      }

      case "22P02": {
        return res.status(400).json({
          status: "requisicao_invalida",
          message:
            "Sintaxe ou tipo de dado inválido enviado para o banco de dados.",
        });
      }

      case "23514": {
        return res.status(400).json({
          status: "requisicao_invalida",
          message: "A operação viola uma regra de validação do banco de dados.",
        });
      }

      case "57014": {
        return res.status(504).json({
          status: "tempo_esgotado",
          message: "A operação no banco de dados excedeu o tempo limite.",
        });
      }

      default: {
        return res.status(500).json({
          status: "erro_banco",
          message: "Erro de processamento no banco de dados.",
        });
      }
    }
  }

  return res.status(500).json({
    status: "erro",
    message: "Erro interno do servidor.",
  });
};
