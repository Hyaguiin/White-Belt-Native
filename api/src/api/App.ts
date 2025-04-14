import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { dbConnection } from "../config/database/Database";
import cavaloRoutes from "../routes/CavaloRoutes";
import charutoRoutes from "../routes/CharutoRoutes";
import whiskyRoutes from "../routes/WhiskyRoutes";
import carrinhoRoutes from "../routes/CarrinhoRoutes";
import {
  criarCarrinhoInicial,
  verificarCarrinhoExistente,
} from "../services/CarrinhoService";
import authRoutes from "../routes/AuthRoutes";


export const app = express();

let url = ["https://hoppscotch.io", "http://localhost:8081"];

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || url.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/cavalo", cavaloRoutes);
app.use("/charuto", charutoRoutes);
app.use("/whisky", whiskyRoutes);
app.use("/carrinho", carrinhoRoutes);
app.use("/api/auth", authRoutes);

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
criarCarrinhoInicial();
verificarCarrinhoExistente();
