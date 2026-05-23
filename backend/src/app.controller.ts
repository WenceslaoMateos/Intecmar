import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}