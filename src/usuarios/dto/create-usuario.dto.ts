import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsISO8601,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombreUsuario: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  genero?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rut: string;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  fechaNacimiento: string;

  @ApiProperty()
  @IsNotEmpty()
  tipoUsuarioId: number;
}
