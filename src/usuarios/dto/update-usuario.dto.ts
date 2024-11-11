import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
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
