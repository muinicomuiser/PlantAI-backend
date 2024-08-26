import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiTags('Saludo')
  @ApiOperation({summary: 'Saludo de entrada.'})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
