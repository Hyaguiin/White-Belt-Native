import { app } from './api/App';
import "dotenv/config";
import WebSocket from "ws";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PORT = process.env.PORT;
const WS_PORT = 6500;

// Inicia servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta: ${PORT}`);
});

// Configuração da IA Generativa
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b", // Modelo alterado para gemini-1.5-flash-8b
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.9,
  },
});

/*async function listModels() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY não configurada.");
    }

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao listar modelos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Modelos disponíveis:", data);
  } catch (error) {
    console.error("Erro ao listar modelos:", error);
  }
}

listModels();
*/
// Servidor WebSocket
const wss = new WebSocket.Server({ port: WS_PORT }, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${WS_PORT}`);
});

wss.on("connection", (ws: WebSocket) => {
  console.log('Nova conexão WebSocket estabelecida');

  ws.on("message", async (message: WebSocket.RawData) => {
    try {
      console.log('Mensagem recebida:', message);

      // Converte o buffer em string
      let messageString: string;
      if (typeof message === 'string') {
        messageString = message;
      } else {
        messageString = message.toString('utf-8');
      }

      if (typeof messageString !== 'string' || messageString.trim().length === 0) {
        console.error('Mensagem inválida:', messageString);
        throw new Error('Mensagem inválida');
      }

      console.log('Mensagem válida:', messageString);

      const result = await model.generateContent(messageString);

      console.log('Resultado da API:', result);

      if (!result || !result.response) {
        console.error('Resposta da API vazia:', result);
        throw new Error('Resposta da API vazia');
      }

      const text = await result.response.text();
      console.log('Resposta gerada:', text);

      ws.send(text);

    } catch (error) {
      console.error('Erro detalhado:', error);

      let errorMessage = 'Desculpe, houve um erro ao processar sua solicitação.';

      if (error instanceof Error) {
        errorMessage += ` Detalhes: ${error.message}`;
      }

      ws.send(errorMessage);
    }
  });

  ws.on("close", () => {
    console.log('Conexão WebSocket fechada');
  });

  ws.on("error", (error) => {
    console.error('Erro na conexão WebSocket:', error);
  });
});