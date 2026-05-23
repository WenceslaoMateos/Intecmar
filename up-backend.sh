#script para levantar en el container solo el backend, para poder correr el front desde local

docker compose down -v

docker compose build --no-cache db backend
docker compose up -d db phpmyadmin backend