import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateUsuarioDto {
  @ApiPropertyOptional({ example: 'Jhon' })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Smith' })
  @IsString()
  @IsOptional()
  apellido?: string;

  @ApiPropertyOptional({ example: 'clave1234' })
  @IsString()
  @IsOptional()
  contrasena?: string;

  @ApiPropertyOptional({ example: 'jhon.smith' })
  @IsString()
  @IsOptional()
  nombreUsuario?: string;

  @ApiPropertyOptional({ example: 'jhon.smith@gmail.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '12345678' })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({ example: 'Masculino' })
  @IsString()
  @IsOptional()
  genero?: string;

  @ApiPropertyOptional({ example: '12345678-9' })
  @IsString()
  @IsOptional()
  @Matches(/^\d{7,8}-[0-9kK]$/, {
    message: 'El RUT debe tener el formato 11111111-1 o 1111111-1',
  })
  rut?: string;

  @ApiPropertyOptional({ example: '1999-12-12' })
  @IsISO8601()
  @IsOptional()
  fechaNacimiento?: Date;

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  tipoUsuarioId?: number;
}
