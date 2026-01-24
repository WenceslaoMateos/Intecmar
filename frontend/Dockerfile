# frontend/Dockerfile
FROM node:24.13-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# IMPORTANTE: --host es necesario para que Docker exponga la red
CMD ["npm", "run", "dev", "--", "--host"]