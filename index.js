const express = require("express");
const jogoSchema = require('./models/Jogo');

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

//get all jogos

app.get('/jogos', async (req, res) => {
  const jogos = await jogoSchema.find();
  res.send(jogos);
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
