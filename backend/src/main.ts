import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración explícita de CORS
  app.enableCors({
    origin: '*', // Permitir desde cualquier origen (ideal para desarrollo)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  
  // Nos aseguramos de que escuche en todas las interfaces de red de Docker
  await app.listen(3000, '0.0.0.0'); 
}
bootstrap();