# Estoque Web
### React + Nginx
Este projeto é o **frontend** da aplicação de Gestão de Estoque, construído com **React** e
servido via **Nginx**.
Ele consome a API backend (Spring Boot) e oferece uma interface amigável para o gerenciamento
de usuários, itens e movimentações.
---
##  Instalação
Clone o repositório:
git clone https://github.com/seuusuario/estoque-web.git
cd web
Instale as dependências:
npm install
Para desenvolvimento local:
npm start
---
##  Estrutura de Telas
- Login e Cadastro
- Itens de Estoque (+1 / -1 / Novo Item)
- Histórico de Movimentações
---
##  Integração com a API
Variável de ambiente `REACT_APP_API`:
Local:
REACT_APP_API=http://localhost:8081
Produção (Docker):
REACT_APP_API=/api
---
##  Build e Deploy
Gere o build de produção:
npm run build
Ou utilize Docker Compose:
docker compose up -d --build
Acesse:
http://localhost:3000
