import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { dbConnection } from "../config/database/Database";
import produtoRouter from "../routes/ProdutoRoutes";
import carrinhoRouter from "../routes/CarrinhoRoutes";
import usuarioRouter from "../routes/UsuarioRoutes";
const PORT = process.env.PORT;

export const app = express();

let origins = [`http://localhost:${PORT}`, "https://hoppscotch.io", "*"];

const corsOptions = {
  origin: origins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/produtos", produtoRouter);
app.use("/carrinho", carrinhoRouter);
app.use("/usuarios", usuarioRouter)

const startServer = async () => {
  try {
    await dbConnection;
    console.log(`Servidor Iniciou corretamente!`);
    app.get("/", async (req: Request, res: Response): Promise<void> => {
      try {
        console.log(`Servidor Rodando no Browser!`);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(`Não roudou: ${err.message}`);
        } else {
          throw new Error(`Erro desconhecido!!`);
        }
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Servidor Não iniciou: ${err.message}`);
    } else {
      throw new Error(`Error Desconhecido!!`);
    }
  }
};

startServer();
