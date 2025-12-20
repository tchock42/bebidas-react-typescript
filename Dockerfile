# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción con servidor estático
FROM node:18-alphine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
CMD ["serve", "-s", "dist", "-l", "8080"]