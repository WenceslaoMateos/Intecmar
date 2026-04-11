import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import 'multer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('dniFile')) // Expecting the file under the key 'dniFile'
  register(
    @Body() body: Record<string, string>, // Contains text fields like body.email and body.password
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    ) file: Express.Multer.File
  ) {
    // Pass both the text data and the secure file buffer to the service
    return this.authService.register(body, file);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // req.user contains the decrypted JWT payload
    return {
      message: 'Welcome to the VIP zone!',
      user: req.user,
    };
  }
}