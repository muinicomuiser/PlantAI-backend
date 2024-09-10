import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('testeo ExceptionFilter')
@Controller()
export class AppController {

@ApiResponse({ status: 400, description: 'Mensaje de prueba' })
    @Get('exception')
    throwException() {
        throw new HttpException('Mensaje de prueba', HttpStatus.BAD_REQUEST);
    }
}
