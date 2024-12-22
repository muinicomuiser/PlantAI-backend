import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetDireccionEnvioDto {

  @ApiProperty({ type: String, example: 'Puente Alto' })
  comuna: string;

  @ApiProperty({ type: String, example: 'Los Toros' })
  calle: string;

  @ApiProperty({ type: String, example: '03010' })
  numero: string;

  @ApiProperty({ type: String, example: '1215' })
  departamento?: string;

  @ApiProperty({ type: String, example: 'Junto al supermercado' })
  referencia?: string;
}
