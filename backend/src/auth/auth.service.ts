import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataSource: DataSource
  ) {}

  // NUEVO: Método para registrar un usuario
  async register(user) {
    let exists;
    try {
      // Usamos sintaxis nativa de MySQL: CALL nombre_procedure(parámetros)
      exists = await this.dataSource.query(
        'CALL userExists(?)',
        [user.email] // <-- Los parámetros se pasan como un array
      );

    } catch (error) {
      console.error('Hubo un problema al acceder a la Base de Datos');
      throw error;
    }
    if (exists) throw new ConflictException('El usuario ya existe');

    // Encriptamos la contraseña (10 rondas es el estándar seguro)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    let newUser;
    try {
      // Usamos sintaxis nativa de MySQL: CALL nombre_procedure(parámetros)
      newUser = await this.dataSource.query(
        'CALL userCreate(?,?)',
        [user.email, hashedPassword] // <-- Los parámetros se pasan como un array
      );

    } catch (error) {
      console.error('Hubo un problema al acceder a la Base de Datos');
      throw error;
    }


    return { mensaje: '¡Usuario creado!', id: newUser.id_user };
  }

  // ACTUALIZADO: Método de login real
  async login(user) {
    let userData
    try {
      // Usamos sintaxis nativa de MySQL: CALL nombre_procedure(parámetros)
      userData = await this.dataSource.query(
        'CALL userExists(?)',
        [user.email] // <-- Los parámetros se pasan como un array
      );

    } catch (error) {
      console.error('Hubo un problema al acceder a la Base de Datos');
      throw error;
    }

    if (!userData) throw new UnauthorizedException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(user.password, userData.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { email: userData.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}