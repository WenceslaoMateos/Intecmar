import { Module } from '@nestjs/common';
import { FileStoringService } from './fileStoring.service';

@Module({
  providers: [FileStoringService],
  exports: [FileStoringService] // Esto es clave: permite que otros módulos usen este servicio
})
export class FileStoringModule {}