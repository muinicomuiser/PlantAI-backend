import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class UpdatePlantaDto {
  @ApiProperty({
    example: true,
    description: 'Indica si la planta es amigable con las mascotas',
  })
  @IsBoolean()
  petFriendly?: boolean;

  @ApiProperty({ example: 20, description: 'Tolerancia de temperatura' })
  @IsInt()
  toleranciaTemperatura?: number;

  @ApiProperty({
    example: true,
    description: 'Indica si la planta es de ciclo',
  })
  @IsBoolean()
  ciclo?: boolean;

  @ApiProperty({
    example: '1.5m',
    description: 'Altura de la planta',
  })
  @IsString()
  altura?: string;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la especie de la planta',
  })
  @IsInt()
  idEspecie?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del color de la planta',
  })
  @IsInt()
  idColor?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del fotoperiodo de la planta',
  })
  @IsInt()
  idFotoperiodo?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de riego de la planta',
  })
  @IsInt()
  idTipoRiego?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del hábito de crecimiento de la planta',
  })
  @IsInt()
  idHabitoCrecimiento?: number;
}
