# backend/Dockerfile
FROM node:24.13-slim

WORKDIR /usr/src/app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de NestJS
EXPOSE 3000

# Comando para iniciar en modo desarrollo
CMD ["npm", "run", "start:dev"]