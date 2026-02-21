import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // NUEVO: Método para registrar un usuario
  async register(usuario: string, pass: string) {
    const existe = await this.usersService.findOneByUsername(usuario);
    if (existe) throw new ConflictException('El usuario ya existe');

    // Encriptamos la contraseña (10 rondas es el estándar seguro)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    const newUser = await this.usersService.create({
      username: usuario,
      password: hashedPassword,
    });

    return { mensaje: '¡Usuario creado!', id: newUser.id };
  }

  // ACTUALIZADO: Método de login real
  async login(usuario: string, pass: string) {
    const user = await this.usersService.findOneByUsername(usuario);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}