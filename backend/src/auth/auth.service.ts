import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FileStoringService } from '../fileStoring/fileStoring.service'; // Adjust path if necessary
import 'multer';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataSource: DataSource,
    private fileStoringService: FileStoringService // Inject the internal storage module
  ) {}

  async register(userData: Record<string, string>, file: Express.Multer.File) {
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

    // 1. Delegate file encryption and storage
    let uidDNIFile: string;
    try {
      uidDNIFile = await this.fileStoringService.storeSecureFile(file);
    } catch (error) {
      console.error('Failed to encrypt/store DNI file:', error);
      throw new InternalServerErrorException('Failed to process DNI image');
    }

    /**
     * apellido
     * nombre
     * fecha nacimiento
     * dni
     * cuil/cuit
     * dni (aca va la imagen)
     * ----genero
     * domicilio
     * ----certificacion de domicilio
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
        'CALL userCreate(?, ?, ?, ?, ?, ?, ?, ?)', // Now expecting 3 parameters!
        [userData.email, hashedPassword, userData.firstName, userData.lastName, userData.birthDate, userData.cuilCuit, userData.dni, uidDNIFile] 
      );
    } catch (error) {
      console.error('Database insertion problem:', error);
      throw new InternalServerErrorException('Failed to create user in database');
    }

    return { 
      message: 'User successfully created!', 
      userId: newUser[0][0].id_user,
    };
  }

  async login(userData: Record<string, string>) {
    let result;
    try {
      result = await this.dataSource.query('CALL userExists(?)', [userData.email]);
    } catch (error) {
      console.error('Database connection problem:', error);
      throw new InternalServerErrorException('Database access failed');
    }

    if (result[0].length === 0) throw new UnauthorizedException('Invalid credentials');

    const userFound = result[0][0];

    const isPasswordValid = await bcrypt.compare(userData.password, userFound.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: userFound.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}