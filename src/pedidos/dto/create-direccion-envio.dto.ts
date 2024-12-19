import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDireccionEnvioDto {

  @ApiProperty({ type: String, example: 'Puente Alto' })
  @IsString()
  @IsNotEmpty()
  comuna: string;

  @ApiProperty({ type: String, example: 'Los Toros' })
  @IsString()
  @IsNotEmpty()
  calle: string;

  @ApiProperty({ type: String, example: '03010' })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({ type: String, example: '1215' })
  @IsString()
  @IsOptional()
  departamento?: string;

  @ApiProperty({ type: String, example: 'Junto al supermercado' })
  @IsString()
  @IsOptional()
  referencia?: string;
}
