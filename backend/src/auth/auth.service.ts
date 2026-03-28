import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // NUEVO: Método para registrar un usuario
  async register(email: string, password: string) {
    const existe = await this.usersService.findOneByUsername(email);
    if (existe) throw new ConflictException('El usuario ya existe');

    // Encriptamos la contraseña (10 rondas es el estándar seguro)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await this.usersService.create({
      email: email,
      password: hashedPassword,
    });

    return { mensaje: '¡Usuario creado!', id: newUser.id_user };
  }

  // ACTUALIZADO: Método de login real
  async login(email: string, password: string) {
    const user = await this.usersService.findOneByUsername(email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id_user, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}