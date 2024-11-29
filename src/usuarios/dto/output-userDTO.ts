import { ApiProperty } from '@nestjs/swagger';

export class OutputUserDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Jhon' })
  nombre: string;

  @ApiProperty({ example: 'Smith' })
  apellido: string;

  @ApiProperty({ example: 'jhon.smith' })
  nombreUsuario: string;

  @ApiProperty({ example: 'jhon.smith@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  telefono: string;

  @ApiProperty({ example: 'Masculino' })
  genero: string;

  @ApiProperty({ example: '12345678-9' })
  rut: string;

  @ApiProperty({ example: '1999-12-12' })
  fechaNacimiento: Date;

  @ApiProperty({ example: 'Cliente' })
  rol: string;

  @ApiProperty({ example: ['Calle Falsa 123', 'Avenida Siempreviva 742'] })
  direcciones: string[];
}
