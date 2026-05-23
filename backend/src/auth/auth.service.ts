import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import 'multer';
import { FileStoringService } from '../fileStoring/fileStoring.service'; 

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataSource: DataSource
) {}

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