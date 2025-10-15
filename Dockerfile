# --- build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Em produção usaremos proxy /api no Nginx, então basta base relativa:
ENV REACT_APP_API=/api
COPY . .
RUN npm run build

# --- serve
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build ./
# nginx conf com proxy para API
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
