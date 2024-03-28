import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3003;

// middleware
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/joke", async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Tell me a joke",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const result = completion.choices[0].message.content;

  res.send(result);
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
