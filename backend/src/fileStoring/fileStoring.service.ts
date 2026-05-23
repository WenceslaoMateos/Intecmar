import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStoringService implements OnModuleInit {
  private readonly storagePath = path.join(__dirname, '..', '..', 'private_storage');
  private readonly algorithm = 'aes-256-gcm';
  private readonly secretKey = process.env.ENCRYPTION_KEY as string;

  // FIX 1: Verificaciones automáticas al arrancar el módulo
  onModuleInit() {
    if (!this.secretKey || this.secretKey.length !== 32) {
      throw new Error('FATAL: ENCRYPTION_KEY debe tener exactamente 32 caracteres.');
    }
    // Crea el directorio fantasma si no existe
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  async storeSecureFile(file: Express.Multer.File): Promise<string> {
    const uid = uuidv4();
    const finalName = `${uid}.enc`; 
    const completePath = path.join(this.storagePath, finalName);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
    
    const encryptedBuffer = Buffer.concat([cipher.update(file.buffer), cipher.final()]);
    const authTag = cipher.getAuthTag();

    const finalFileContent = Buffer.concat([iv, authTag, encryptedBuffer]);
    fs.writeFileSync(completePath, finalFileContent);

    return finalName;
  }

  getSecureFile(fileName: string): Buffer {
    const filePath = path.join(this.storagePath, fileName);
    if (!fs.existsSync(filePath)) throw new NotFoundException('Archivo no encontrado');

    const fileBuffer = fs.readFileSync(filePath);

    const iv = fileBuffer.subarray(0, 16);
    const authTag = fileBuffer.subarray(16, 32);
    const encryptedData = fileBuffer.subarray(32);

    const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  }
  
  async storeFile(file: Express.Multer.File): Promise<string> {
    const uid = uuidv4();
    // Extract the original extension (e.g., '.jpg', '.pdf')
    const extension = path.extname(file.originalname); 
    const finalName = `${uid}${extension}`; 
    const completePath = path.join(this.storagePath, finalName);

    // Save the raw buffer directly to the disk without encryption
    fs.writeFileSync(completePath, file.buffer);

    return finalName;
  }

  getFile(fileName: string): Buffer {
    const filePath = path.join(this.storagePath, fileName);
    
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    // Read and return the raw file from the disk
    return fs.readFileSync(filePath);
  }
}
