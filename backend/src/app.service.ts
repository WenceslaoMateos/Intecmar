import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm'; // <--- Importar DataSource

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {} // <--- Inyectar la conexión

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