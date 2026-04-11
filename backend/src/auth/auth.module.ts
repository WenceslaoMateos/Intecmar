import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FileStoringModule } from '../file-storing.module'; // Adjust the path

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // En el futuro, esto va en el .env
      signOptions: { expiresIn: '1h' }, // El token dura 1 hora
    }),
    JwtModule.register({ /* ... tu config ... */ }),
    FileStoringModule, // Now Auth can use the storage service
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}