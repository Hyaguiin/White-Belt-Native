import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { dbConnection } from "../config/database/Database";


export const app = express();

const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


const startServer = async()=>{
    try{
        await dbConnection;
        console.log(`Servidor Iniciou corretamente!`);
        app.get('/', async(req: Request, res: Response): Promise<void> =>{
            try{
                console.log(`Servidor Rodando no Browser!`);
            }catch(err){
                if(err instanceof Error){
                    throw new Error(`Não roudou: ${err.message}`);
        
                }else{
                    throw new Error(`Erro desconhecido!!`);
                }
            }
        })

    }catch(err){
        if(err instanceof Error){
            throw new Error(`Servidor Não iniciou: ${err.message}`);
        }else{
            throw new Error(`Error Desconhecido!!`)
        }
    }
}

startServer();



