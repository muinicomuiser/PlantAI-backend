import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'qwerty123' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'La contraseña no puede tener más de 50 caracteres',
  })
  contrasena: string;

  @ApiProperty({ example: 'Juanito' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El nombre no puede tener más de 50 caracteres',
  })
  nombre: string;

  @ApiProperty({ example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El apellido no puede tener más de 50 caracteres',
  })
  apellido: string;

  @ApiProperty({ example: 'Juanelo Rabioso' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El nombre usuario no puede tener más de 50 caracteres',
  })
  nombreUsuario: string;

  @ApiProperty({ example: 'bulbasaur1991@hotmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '98745632' })
  @IsOptional()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'Masculino' })
  @IsOptional()
  @MaxLength(50, {
    message: 'El género no puede tener más de 50 caracteres',
  })
  @IsString()
  genero?: string;

  @ApiProperty({ example: '12345897-2' })
  @Matches(/^\d{7,8}-[0-9kK]$/, {
    message: 'El RUT debe tener el formato 11111111-1 o 1111111-1',
  })
  @IsString()
  @IsNotEmpty()
  rut: string;

  @ApiProperty({ example: '1991-12-25' })
  @IsISO8601()
  @IsNotEmpty()
  fechaNacimiento: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  tipoUsuarioId: number;
}
