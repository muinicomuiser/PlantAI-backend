import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, MaxLength } from 'class-validator';

export class CreatePlantaDto {
  idProducto: number;

  @ApiProperty({
    example: true,
    description: 'Indica si la planta es amigable con las mascotas',
  })
  @IsBoolean()
  petFriendly: boolean;

  @ApiProperty({
    example: true,
    description: 'Indica si la planta es de ciclo',
  })
  @IsBoolean()
  ciclo: boolean;

  @ApiProperty({
    description: 'Especie de la planta',
  })
  @MaxLength(50)
  @IsString()
  especie: string;

  @ApiProperty({
    example: 1,
    description: 'Identificador del color de la planta',
  })
  @IsInt()
  idColor: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del fotoperiodo de la planta',
  })
  @IsInt()
  idFotoperiodo: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de riego de la planta',
  })
  @IsInt()
  idTipoRiego: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del hábito de crecimiento de la planta',
  })
  @IsInt()
  idHabitoCrecimiento: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del tamaño de la planta',
  })
  @IsInt()
  idTamano: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la tolerancia a la temperatura de la planta',
  })
  @IsInt()
  idToleranciaTemperatura: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del entorno de la planta',
  })
  @IsInt()
  idEntorno: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la iluminación de la planta',
  })
  @IsInt()
  idIluminacion: number;

  // // Relaciones

  // @ApiProperty({ description: 'Color de la planta' })
  // color: string;

  // @ApiProperty({
  //   description: 'Fotoperiodo de la planta',
  // })
  // fotoPeriodo: string;

  // @ApiProperty({
  //   description: 'Tipo de riego de la planta',
  // })
  // tipoRiego: string;

  // @ApiProperty({
  //   description: 'Hábito de crecimiento de la planta',
  // })
  // habitoCrecimiento: string;
}
