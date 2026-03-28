import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- Importar esto
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',             // <--- Nombre del servicio en Docker Compose
      port: 3306,
      username: 'root',       // <--- El que pusiste en docker-compose
      password: 'root', // <--- El que pusiste en docker-compose
      database: 'tesis_db',   // <--- El que pusiste en docker-compose
      autoLoadEntities: true, // Carga automática de tus entidades
      synchronize: true,      // ¡IMPORTANTE! Crea las tablas automáticamente (solo para dev)
      retryAttempts: 10,
      retryDelay: 3000, // Espera 3 segundos entre cada intento
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}