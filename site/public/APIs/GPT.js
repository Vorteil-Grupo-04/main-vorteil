const express = require("express");
const cors = require("cors"); // Importando o cors
const { OpenAI } = require("openai"); 
require("dotenv").config();

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors()); // Permite requisições de qualquer origem

// descomente e coloque a APIKEY:

const openai = new OpenAI({
 apiKey: "", 
});

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Endpoint para processar prompts
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body; // Obtém o prompt enviado no corpo da requisição

  if (!prompt) {
    return res.status(400).json({ error: "O campo 'prompt' é obrigatório." });
  }

  try {
    // Faz a chamada para a API do ChatGPT
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Ou "gpt-4", dependendo da sua necessidade
      messages: [
        { role: "system", content: "Você é um assistente útil e amigável." },
        { role: "user", content: prompt },
      ],
    });

    // Obtém a resposta gerada pela API
    const resposta = response.choices[0].message.content;

    // Retorna a resposta como JSON
    res.json({ resposta });
  } catch (error) {
    console.error("Erro ao chamar a API:", error.response?.data || error.message);
    res.status(500).json({
      error: "Erro ao processar a solicitação. Tente novamente mais tarde.",
    });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
