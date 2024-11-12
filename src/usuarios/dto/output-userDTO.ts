import { ApiProperty } from "@nestjs/swagger";

export class OutputUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty()
  nombreUsuario: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  genero: string;

  @ApiProperty()
  rut: string;

  @ApiProperty()
  fechaNacimiento: Date;

  @ApiProperty()
  tipoUsuario: string;

  @ApiProperty()
  direcciones: string[];
}
