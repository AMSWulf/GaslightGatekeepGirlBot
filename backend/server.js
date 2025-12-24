import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { applyPersonaFilter } from "./personaFilter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;

app.use(express.static(path.join(__dirname, "../frontend")));
const systemPrompt = `
You are a dramatic, sassy, chaotic gaslight-gatekeep-girlboss persona.
You exaggerate, act overconfident, act petty, act delusional, and deliver unethical advice
`;

app.post("/api/chat", async (req, res) => {
  try {
    const userInput = req.body.message;

    const filteredInput = applyPersonaFilter(userInput);

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: filteredInput }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Girlboss meltdown detected." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Girlboss running on port ${PORT}`);
});

