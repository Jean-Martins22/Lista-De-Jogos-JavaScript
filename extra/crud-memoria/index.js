// Baixar o express no terminal com o comando: npm i express

const express = require("express"); // importa o módulo express do node_modules

const app = express(); // cria o nosso objeto app, que vai poder utilizar tudo o que o express possui

app.use(express.json()); // Converte requisições e repostas para JSON (JavaScript Object Notation)

const port = 3000; // constante para salvar a porta do servidor

const jogos = [
     {
      id: 1,
      nome: "The Witcher 3",
      imagem: "https://p2.trrsf.com/image/fget/cf/1200/1200/filters:quality(85)/images.terra.com/2021/07/09/the-witcher-3-wild-hunt.jpg",
    },
    {
      id: 2,
      nome: "Final Fantasy XV",
      imagem: "https://jogos.zwame.pt/wp-content/uploads/2018/09/Final-Fantasy-XV-Pocket-Edition.jpg",
    },
    {
      id: 3,
      nome: "Rocket League",
      imagem: "https://www.oficinadanet.com.br/imagens/post/32824/egs-social-rocketleague-news-1920x1080-1920x1080-975383433.jpg",
    },
    {
      id: 4,
      nome: "Mortal Shell",
      imagem: "https://i2.wp.com/manualdosgames.com/wp-content/uploads/2020/08/Mortal-Shell.jpg",
    },
    {
      id: 5,
      nome: "Dark Souls 3",
      imagem: "https://mmovicio.com.br/wp-content/uploads/2021/07/Dark-Souls-3.jpg",
    },
    {
      id: 6,
      nome: "Gta V",
      imagem: "https://compass-ssl.xbox.com/assets/a0/4f/a04f2744-74d9-4668-8263-e0261fbea869.jpg?n=GTA-V_GLP-Page-Hero-1084_1920x1080.jpg",
    },
    {
      id: 7,
      nome: "Minecraft",
      imagem: "https://p2.trrsf.com/image/fget/cf/1200/628/middle/images.terra.com/2015/06/24/minecraft-3.png",
    },
    {
      id: 8,
      nome: "Dead By Daylight",
      imagem: "https://cdn-ext.fanatical.com/production/product/1280x720/b3ee69f1-5635-48a3-b357-d4704650e989.jpeg",
    },
    {
      id: 9,
      nome: "Stardew Valley",
      imagem: "https://noticias.maisesports.com.br/wp-content/uploads/2021/08/Stardew-Valley.jpg",
    },
    {
      id: 10,
      nome: "Terraria",
      imagem: "https://www.einerd.com.br/wp-content/uploads/2020/05/Terraria-atualiza%C3%A7%C3%A3o-capa.jpg",
    },
  ];


// Função responsável por filtrar apenas os jogos que possuem valores válidos, ou seja, não são null.

const getJogosValidos = () => jogos.filter(Boolean);

// Função responsável por fazer o getById de jogos:

const getJogoById = id => getJogosValidos().find(jogo => jogo.id === id); 

// Função responsável por fazer o getByIndex de jogos:

const getJogoIndexById = id => getJogosValidos().findIndex(jogo => jogo.id === id)

// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

// GET /jogos - Retornar a lista de jogos

app.get("/jogos", (req, res) => {
    res.json({ jogos }); // .json converte nosso array ou objeto para JSON
});
  
// GET /jogos/{id} - Retornar a lista de jogos pelo ID

app.get("/jogos/:idjogo", (req, res) => {
// Rota com recebimento de parametro (:id)
    const id = +req.params.idjogo;
    const jogo = getJogoById(id);
  
    !jogo
      ? res.status(404).send({ error: "Jogo não existe" })
      : res.json({ jogo });
});

// POST - /jogos - Criar um novo jogo

app.post("/jogos", (req, res) => {
    const jogo = req.body; // Pego o JSON inteiro do body e insiro na const jogo (desse lado é convertido para um obejto "normal" de js)
  
    if (!jogo || !jogo.nome || !jogo.imagem) {
      res.status(400).send({ error: "Jogo inválido!" });
      return;
    }
  
    // Pega o último elemento da lista jogos

    const ultimoJogo = jogos[jogos.length - 1];

      // Testa se a lista não está vazia

  if (jogos.length) { // Se o retorno de jogos.length for 0 faça...  (0 == false)
    
    // Pegar o valor do ultimo id disponivel e somar + 1
    
    jogo.id = ultimoJogo.id + 1;
    jogos.push(jogo); // Insere o objeto jogo no array jogos
  } else {
    
    // Caso a lista esteja vazia o valor de id é 1
    
    jogo.id = 1;
    jogos.push(jogo);// Insere o objeto jogo no array jogos
  }

  res.status(201).send({ jogo });
});

// PUT - /jogos/{id} - Altera um jogo pelo ID

app.put("/jogos/:id", (req, res) => {
  const id = +req.params.id;

  // findIndex retorna a posição do objeto dentro do array(jogos), caso não exista, retorna -1

  const jogoIndex = getJogoIndexById(id)

  // Validação para verificar se o jogo existe no array

  if (jogoIndex < 0) {
    res.status(404).send({error: "Jogo não encontrado."});
    return;
  }

  // Pega o objeto JSON enviado no body da requisição

  const novoJogo = req.body;

  // Valida se todos os campos necessários foram enviados.

  if (!novoJogo || !novoJogo.nome || !novoJogo.imagem) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }

  // Procuro o jogo cadastrado no meu array, pelo id passado no parametro, e insiro o objeto inteiro, dentro da const jogo.

  const jogo = getJogoById(id)
  
  // Adiciona o id do jogo antigo no jogo novo:

  novoJogo.id = jogo.id
  
  // Insere o jogo novo, na posição encontrada findIndex, do array.

  jogos[jogoIndex] = novoJogo

  res.send({ message: "Jogo alterado com sucesso!"});
});
  
  // Delete - jogos/{id} - apagar um jogo pelo ID

  app.delete("/jogos/:id", (req, res) => {
    const id = +req.params.id;
  
    const jogoIndex = getJogoIndexById(id)
    if (jogoIndex < 0) {
      res.status(404).send({error: "Jogo não encontrado."});
      return;
    }
  
    // O Splice recebe dois parametros, a posição do valor a ser apagada e "quantos" valores quero apagar depois desse na minha lista, se eu quiser apagar apenas ele mesmo, colo o numero 1.

    jogos.splice(jogoIndex, 1);
  
    res.send({ message: "Jogo apagado com sucesso!"});
  });
  

// A função listen do objeto app serve para "ligar" o nosso back-end ou servir o nosso back-end
// É obrigatório que essa chamada de função esteja SEMPRE no final do nosso código!
  
app.listen(port, () => {

    // recebe dois parametros, a porta e um função de callback para principalmente mostra um mensagem no console.
    
    console.log(`Servidor rodando em http://localhost:${port}`);
  });