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

      // 2. Save User + File UID to the database
      let newUser;
      try {
        newUser = await this.dataSource.query(
          'CALL userCreate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
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
            savedCvFileName,
            userData.address,
            userData.country,
            userData.province,
            userData.county,
            userData.city
          ] 
        );
      } catch (error) {
        console.error('Database insertion problem:', error);
        throw new InternalServerErrorException('Failed to create user in database');
      }
  
      return { 
        message: 'User successfully created!', 
        userId: newUser[0][0].id_user      
      };
    }
  
  async getUserData(id: number){
    let user
    try{
      user = await this.dataSource.query('CALL getUser(?)', [id]);
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }    
    return user[0];
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

  async getUserRoles(id: number) {
    let roles
    try {
      roles = await this.dataSource.query('CALL listUserRoles(?)', [id]);
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

  async getCountries() {
    let countries;
    try {
      countries = await this.dataSource.query('CALL getCountries()');
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return countries[0];
  }

  async getProvinces() {
    let provinces;
    try {
      provinces = await this.dataSource.query('CALL getProvinces()');
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return provinces[0];
  }

  async getCountiesByProvince(provinceId: string) {
    let counties;
    try {
      counties = await this.dataSource.query('CALL getCountiesByProvince(?)', [provinceId]);
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return counties[0];
  }

  async getCitiesByCounty(countyId: string) {
    let cities;
    try {
      cities = await this.dataSource.query('CALL getCitiesByCounty(?)', [countyId]);
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }
    return cities[0];
  }
}