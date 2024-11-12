import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateUsuarioDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  apellido?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contrasena?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nombreUsuario?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  genero?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Matches(/^\d{7,8}-[0-9kK]$/, {
    message: 'El RUT debe tener el formato 11111111-1 o 1111111-1',
  })
  rut?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  fechaNacimiento?: Date;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  tipoUsuarioId?: number;
}
