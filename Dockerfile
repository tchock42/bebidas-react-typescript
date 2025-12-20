# Etapa de build
# 1. Construcción
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Servidor ligero
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
# Copiamos solo lo necesario desde la etapa de build
COPY --from=build /app/dist ./dist
# Exponemos el puerto 8080 que es el estándar de Cloud Run
CMD ["serve", "-s", "dist", "-l", "8080"]