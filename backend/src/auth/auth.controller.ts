import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: Record<string, string>) {
    return this.authService.register(body.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: Record<string, string>) {
    return this.authService.login(body.user);
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getProfile(@Request() req) {
    // req.user tiene los datos que desencriptamos del JWT
    return {
      mensaje: '¡Entraste a la zona VIP!',
      usuario: req.user,
    };
  }
}