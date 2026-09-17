CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"senha" varchar(255) NOT NULL,
	"telefone" integer NOT NULL,
	"endereco" varchar
);
