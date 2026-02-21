# frontend/Dockerfile
FROM node:24.13-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Next.js usa el puerto 3000 por defecto
EXPOSE 3000

# Le decimos a Next.js que escuche en todas las interfaces de red de Docker
ENV HOSTNAME="0.0.0.0"

# El comando limpio para Next.js
CMD ["npm", "run", "dev"]