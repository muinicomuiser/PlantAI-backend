import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsISO8601,
  Matches,
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
  @Matches(/^\d{7,8}-\d{1}$/, {
    message: 'El RUT debe tener el formato 11111111-1 o 1111111-1',
  })
  rut: string;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  fechaNacimiento: string;

  @ApiProperty()
  @IsNotEmpty()
  tipoUsuarioId: number;
}
