import "dotenv/config";
import mongoose from "mongoose";

const dataBaseURL = process.env.DATABASE_URL as string;

export const dbConnection = mongoose
  .connect(dataBaseURL)
  .then(() => console.log(`Conectou no Banco de DADOS!`))
  .catch((err) => console.error(`Não foi possível conectar ao banco de dados!  ${err}`));
