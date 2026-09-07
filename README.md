# Tripleten web_project_api_full

Aplicação React/Vite em `frontend/` e API Node.js/Express em `backend/`. O repositório usa apenas o `.git` da raiz.

## Endereços públicos

- Frontend (Vercel): pendente de criação e configuração do domínio.
- API (Render): pendente de criação e configuração do domínio.

Os links reais serão adicionados após a implantação. O projeto ainda não está publicado.

## Execução local

Use Node.js 24 e MongoDB disponível em `mongodb://localhost:27017`. Em desenvolvimento, o backend usa o banco `aroundb` e funciona sem arquivo `.env`.

Em um terminal, a partir da raiz:

```powershell
cd backend
npm ci
npm run dev
```

Em outro terminal, a partir da raiz:

```powershell
cd frontend
npm ci
npm run dev
```

Abra `http://localhost:5173`. O proxy local encaminha `/api` para `http://localhost:3000`. O token JWT é salvo no `localStorage` e enviado nas chamadas protegidas.

## Preparação das contas

1. Crie contas no MongoDB Atlas, Render e Vercel.
2. No Atlas, crie o banco/cluster, um usuário de banco e configure o acesso de rede para o serviço do Render. Guarde a URI de conexão apenas nas configurações privadas do backend.
3. Envie a versão atual do código ao GitHub antes de conectar o repositório às plataformas.
4. Escolha um domínio com controle de DNS para o site e um subdomínio para a API, por exemplo `seudominio.com` e `api.seudominio.com`.

## Backend no Render

Crie um **Web Service**, conectado ao repositório GitHub:

| Campo | Valor |
| --- | --- |
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm ci --omit=dev` |
| Start Command | `npm start` |
| Node.js | 24.x, definido no `package.json` |

`npm start` executa `pm2-runtime app.js --name around-api`. A API escuta em `0.0.0.0` na porta fornecida pelo Render em `PORT`, depois de conectar ao banco. Para esta configuração, use a verificação de porta TCP; as rotas de dados exigem autenticação.

### Arquivo .env somente no servidor

Em **Environment → Secret Files**, crie um arquivo chamado `.env` com valores reais para:

```dotenv
NODE_ENV=production
JWT_SECRET=SUBSTITUA_POR_UM_SEGREDO_ALEATORIO_PRIVADO
MONGODB_URI=SUBSTITUA_PELA_URI_DO_MONGODB_ATLAS
```

O código carrega `.env` da pasta do backend ou de `/etc/secrets/.env`. As variáveis já definidas pelo serviço têm precedência. Em produção, a inicialização falha se `JWT_SECRET` ou `MONGODB_URI` estiverem ausentes. Em desenvolvimento, sem `.env`, são usados os valores locais.

Não crie nem versione um `.env` com segredos no repositório. Não coloque o segredo JWT ou a URI do banco em variáveis do frontend. O `.gitignore` do backend exclui os arquivos `.env`.

## Frontend na Vercel

Importe o mesmo repositório:

| Campo | Valor |
| --- | --- |
| Root Directory | `frontend` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 24.x |

Antes do build, configure `VITE_API_BASE_URL` com a URL HTTPS real do backend, por exemplo `https://api.seudominio.com`, sem `/api` e sem barra final. Ao mudar essa variável, faça um novo deploy para gerar o build com o endereço atualizado.

`frontend/vercel.json` encaminha as rotas da aplicação para `index.html`, permitindo abrir `/login` e `/register` diretamente. O backend habilita CORS antes da autorização, incluindo as solicitações `OPTIONS`.

## Domínio e HTTPS

Adicione o domínio do frontend na Vercel e o subdomínio da API no Render. Configure os registros DNS exatamente como indicado por cada plataforma e aguarde a confirmação e emissão dos certificados HTTPS. A hospedagem e o roteamento são gerenciados pelas plataformas, conforme a alternativa autorizada para o projeto.

Depois de confirmar os domínios, atualize `VITE_API_BASE_URL`, publique o frontend novamente e substitua os campos pendentes no início deste README pelos links reais.

## Verificação e teste de falha

Teste pelo domínio público: cadastro, login, restauração da sessão, edição de perfil/avatar, criação e exclusão de cartões, curtidas e remoção de curtidas. Confirme também que um usuário não exclui cartões de outro.

A rota pública `GET /crash-test`, exigida temporariamente para a revisão, provoca uma falha não tratada no processo Node. Execute-a apenas quando for realizar o teste de recuperação. A solicitação pode terminar com conexão interrompida; confira no Render/PM2 o reinício e repita uma chamada autenticada a `/users/me` para verificar a recuperação automática.

**Remova a rota `/crash-test` depois da aprovação na revisão e publique novamente.**

Os arquivos `request.log` e `error.log` são escritos em JSON no backend e ignorados pelo Git. O armazenamento padrão do Render é temporário; esses arquivos não têm retenção garantida entre reinicializações e deploys.
