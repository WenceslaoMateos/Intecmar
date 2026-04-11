import { Module } from '@nestjs/common';
import { FileStoringService } from './fileStoring/fileStoring.service';

@Module({
  providers: [FileStoringService],
  exports: [FileStoringService], // CRITICAL: This makes it available to the rest of the server
})
export class FileStoringModule {}