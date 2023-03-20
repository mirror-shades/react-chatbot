import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configutation = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configutation);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello World!" });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.complete({
      engine: "davinci",
      prompt: prompt,
      maxTokens: 1000,
      temperature: 0,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
    });
    res.status(200).send({ message: response.data.choices[0].text });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
