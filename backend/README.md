# Around the U.S. - Express

**Node.js • Express.js • REST API • JavaScript**

---

# 📖 Sobre o projeto

**Around the U.S. - Express** é uma API REST desenvolvida com **Node.js** e **Express.js**.

O projeto é responsável pelo back-end da aplicação Around the U.S., disponibilizando endpoints para acesso aos dados de usuários e cartões através do protocolo HTTP. Durante o desenvolvimento foram aplicados conceitos fundamentais de criação de servidores, rotas, requisições, respostas HTTP e organização de uma aplicação utilizando Express.

---

# ✨ Funcionalidades

- Inicialização de servidor Express
- Criação de rotas da aplicação
- Listagem de usuários
- Busca de usuário por ID
- Listagem de cartões
- Busca de cartão por ID
- Tratamento de rotas inexistentes (404)
- Respostas em formato JSON
- Organização das rotas em arquivos separados

---

# 🛠️ Tecnologias utilizadas

- Node.js
- Express.js
- JavaScript (ES6+)
- JSON
- Git
- GitHub

---

# 📂 Estrutura do projeto

```text
web_project_around_express/
│
├── data/
│   ├── users.json
│   └── cards.json
├── routes/
│   ├── users.js
│   ├── cards.js
│   └── index.js
├── app.js
├── package.json
└── README.md
```

> _A estrutura pode variar ligeiramente conforme a versão final do projeto._

---

# 🚀 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/gustavoagsilva/web_project_around_express.git
```

Entre na pasta:

```bash
cd web_project_around_express
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Caso exista um script de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em:

```text
http://localhost:3000
```

---

# 📌 Endpoints da API

## Usuários

| Método | Endpoint     | Descrição                  |
| ------ | ------------ | -------------------------- |
| GET    | `/users`     | Lista todos os usuários    |
| GET    | `/users/:id` | Retorna um usuário pelo ID |

## Cartões

| Método | Endpoint | Descrição              |
| ------ | -------- | ---------------------- |
| GET    | `/cards` | Lista todos os cartões |

---

# 🎯 Objetivos de aprendizagem

Este projeto teve como foco praticar:

- Criação de servidores com Express.js
- Organização de rotas
- APIs REST
- Métodos HTTP
- Parâmetros de rota
- Leitura de arquivos JSON
- Tratamento de erros
- Códigos de status HTTP
- Estruturação de aplicações Node.js
- Boas práticas de desenvolvimento Back-end

---

# 📌 Melhorias futuras

- Integração com banco de dados
- Criação de novos usuários
- Cadastro de cartões
- Atualização de informações
- Exclusão de usuários e cartões
- Validação de dados
- Middleware para tratamento de erros
- Autenticação de usuários
- Deploy da API

---

# 👨‍💻 Desenvolvedor

**Gustavo Augusto Garcia da Silva**

**LinkedIn:** https://www.linkedin.com/in/gustavo-augusto-garcia/

**GitHub:** https://github.com/gustavoagsilva
