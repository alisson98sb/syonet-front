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
---
##  Nginx
Configuração principal:
server {
listen 80;
root /usr/share/nginx/html;
index index.html;
location / {
try_files $uri $uri/ /index.html;
}
location /api/ {
proxy_pass http://api:8081/;
}
}
---
##  Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --fund=false
ENV REACT_APP_API=/api
COPY . .
RUN npm run build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80