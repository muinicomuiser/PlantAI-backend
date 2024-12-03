import { Module } from '@nestjs/common';
import { IaconsultasController } from './controller/iaconsultas.controller';
import { IaconsultasService } from './service/iaconsultas.service';

@Module({
  controllers: [IaconsultasController],
  providers: [IaconsultasService]
})
export class IaconsultasModule { }
