import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'NuevaContraseña123',
  })
  @IsString()
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  nuevaContrasena: string;

  @ApiProperty({
    description: 'Confirmación de la nueva contraseña',
    example: 'NuevaContraseña123',
  })
  @IsString()
  @IsNotEmpty({ message: 'La confirmación de la contraseña es obligatoria' })
  @MinLength(8, { message: 'La confirmación debe tener al menos 8 caracteres' })
  confirmarNuevaContrasena: string;
}
