const express = require("express");
const jogoSchema = require('./models/Jogo');
const mongoose = require("./database");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

// [GET] /jogos - Retornar a lista de jogos no nosso banco de dados!

app.get('/jogos', async (req, res) => {
  const jogos = await jogoSchema.find();
  res.send(jogos);
});

// [GET] /jogos/:id - Retornar um unico jogo pelo ID

app.get("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  // Verificar se o id recebido no parametro é um ID válido:

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }
  // Buscar no mongodb o document que possui o id recebido pela req.param

  const jogo = await jogoSchema.findById(id);

  // Verificar se o document foi encontrado:

  if (!jogo) {
    res.status(404).send({ erro: "Jogo não encontrado!" });
    return;
  }
  res.send({ jogo });
});

// [POST] - /jogos - Cria um novo jogo

app.post("/jogos", async (req, res) => {
  const jogo = req.body;

  if (!jogo || !jogo.nome || !jogo.imagem) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }

  const novoJogo = await new jogoSchema(jogo).save();

  res.status(201).send({ novoJogo });
});

// [PUT] - jogos/:id Atualiza um jogo pelo Id

app.put("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }

  const jogo = await jogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ erro: "Jogo não encontrado!" });
    return;
  }

  const novoJogo = req.body;

  if (!jogo || !jogo.nome || !jogo.imagem) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }

  // Procura um document pelo id no banco e altera o document inteiro.

  await jogoSchema.findOneAndUpdate({ _id: id }, novoJogo);

  // Busca o document atualizado no banco e insere na const jogoAtualizado
  
  const jogoAtualizado = await jogoSchema.findById(id);

  res.send({ jogoAtualizado });
});

// [DELETE] - /jogos/:id - Remover um jogo pelo Id

app.delete("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }

  const jogo = await jogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ error: "Jogo não encontrado!" });
    return;
  }

  await jogoSchema.findByIdAndDelete(id);
  res.send({message: 'Jogo excluído com sucesso!'})
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
