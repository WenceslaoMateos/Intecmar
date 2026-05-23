import { AppService } from './app.service';
import { Body, Controller, Post, Get, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('cvFile')) // The string here must match your frontend FormData key
  register(
    @Body() body: Record<string, string>,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10 MB limit
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }), // Accepted formats
        ],
      }),
    ) file: Express.Multer.File
  ) {
    // We now pass both the text body and the file to your service
    return this.appService.register(body, file);
  }
  
  @Get('roles')
  getRoles() {
    return this.appService.getRoles();
  }

  @Get('type_documents')
  getDocumentTypes() {
    return this.appService.getDocumentTypes();
  }

  @Get('genders')
  getGenders() {
    return this.appService.getGenders();
  }

  @Get('institutions')
  getInstitutions() {
    return this.appService.getInstitutions();
  }
}