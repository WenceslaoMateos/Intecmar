import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm'; // <--- Importar DataSource
import { FileStoringService } from './fileStoring/fileStoring.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private dataSource: DataSource,
    private fileStoringService: FileStoringService 
  
  ) {} // <--- Inyectar la conexión

    async register(userData: Record<string, string>, cvFile?: Express.Multer.File) {
      let exists;
      try {
        exists = await this.dataSource.query('CALL userExists(?)', [userData.email]);
      } catch (error) {
        console.error('Database connection problem:', error);
        throw new InternalServerErrorException('Database access failed');
      }
  
      if (exists[0].length !== 0) throw new ConflictException('User already exists');
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
      let savedCvFileName: string | null = null;
      if (cvFile) {
        try {
          savedCvFileName = await this.fileStoringService.storeFile(cvFile);
        } catch (error) {
          console.error('Failed to store CV file:', error);
          throw new InternalServerErrorException('Failed to process CV file');
        }
      }
  
      /**
       * apellido
       * nombre
       * fecha nacimiento
       * tipo de doc
       * numero de doc
       * cuil/cuit
       * cv
       * genero
       * ----domicilio
       * ----localidad
       * ----partido
       * ----provincia
       * ----nacionalidad
       * roles array com los roles
       *    -mas de uno, asi que llega un array de los ids que quiere el usuario
       *    -si es referente institucional, tiene que poner la institucion acorde a un valor de las guardadas
       */
  
      // 2. Save User + File UID to the database
      let newUser;
      try {
        newUser = await this.dataSource.query(
          // Actualizamos a 9 signos de interrogación para incluir el CV
          'CALL userCreate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
          [
            userData.email, 
            hashedPassword, 
            userData.firstName, 
            userData.lastName, 
            userData.birthDate, 
            userData.cuilCuit, 
            userData.typeDocument, 
            userData.numberDocument,
            userData.gender,
            savedCvFileName // Pasamos el string del archivo o 'null'
          ] 
        );
      } catch (error) {
        console.error('Database insertion problem:', error);
        throw new InternalServerErrorException('Failed to create user in database');
      }
  
      return { 
        message: 'User successfully created!', 
        userId: newUser[0][0].id_user,
        cvFile: savedCvFileName // Opcional: retornamos cómo se guardó para que el front lo sepa
      };
    }
  
  

  async getRoles(){
    let roles
    try {
      roles = await this.dataSource.query('CALL listRoles()');
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return roles[0];
  }

  async getDocumentTypes() {
    let documentTypes;
    try {
      documentTypes = await this.dataSource.query('CALL getDocumentTypes()');
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return documentTypes[0];
  }

  async getGenders() {
    let genders;
    try {
      genders = await this.dataSource.query('CALL getGenders()');
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return genders[0];
  }

  async getInstitutions() {
    let institutions;
    try {
      institutions = await this.dataSource.query('CALL getInstitutions()');
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return institutions[0];
  }
}