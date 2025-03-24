import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { dbConnection } from "../config/database/Database";
import cavaloRoutes from "../routes/CavaloRoutes";
import charutoRoutes from "../routes/CharutoRoutes";
import whiskyRoutes from "../routes/WhiskyRoutes";
import carrinhoRoutes from "../routes/CarrinhoRoutes";

export const app = express();

let origins = [
    "http://localhost:5000",
    "https://hoppscotch.io",
    '*'
]

const corsOptions = {
  origin: origins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/cavalo', cavaloRoutes);
app.use('/charuto', charutoRoutes);
app.use('/whisky', whiskyRoutes);
app.use('/carrinho', carrinhoRoutes);

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
