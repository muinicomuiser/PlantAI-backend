import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'clave1234' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'La contraseña no puede tener más de 50 caracteres',
  })
  contrasena: string;

  @ApiProperty({ example: 'Jhon' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El nombre no puede tener más de 50 caracteres',
  })
  nombre: string;

  @ApiProperty({ example: 'Smith' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El apellido no puede tener más de 50 caracteres',
  })
  apellido: string;

  @ApiProperty({ example: 'jhon.smith' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El nombre usuario no puede tener más de 50 caracteres',
  })
  nombreUsuario: string;

  @ApiProperty({ example: 'jhon.smith@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  telefono?: string;

  @ApiProperty({ example: 'Masculino' })
  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: 'El género no puede tener más de 50 caracteres',
  })
  genero?: string;

  @ApiProperty({ example: '11111111-1' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{7,8}-[0-9kK]$/, {
    message: 'El RUT debe tener el formato 11111111-1 o 1111111-1',
  })
  rut: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsISO8601()
  @IsNotEmpty()
  fechaNacimiento: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  tipoUsuarioId: number;
}
