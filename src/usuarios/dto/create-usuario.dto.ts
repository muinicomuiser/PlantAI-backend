import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'La contraseña no puede tener más de 50 caracteres',
  })
  contrasena: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El nombre no puede tener más de 50 caracteres',
  })
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El apellido no puede tener más de 50 caracteres',
  })
  apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'El nombre usuario no puede tener más de 50 caracteres',
  })
  nombreUsuario: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  telefono?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: 'El género no puede tener más de 50 caracteres',
  })
  genero?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{7,8}-[0-9kK]$/, {
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
