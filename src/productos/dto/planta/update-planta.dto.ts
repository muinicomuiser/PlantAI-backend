import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePlantaDto {
  @ApiProperty({
    example: true,
    description: 'Indica si la planta es amigable con las mascotas',
  })
  @IsBoolean()
  @IsOptional()
  petFriendly?: boolean;

  @ApiProperty({ example: 20, description: 'Tolerancia de temperatura' })
  @IsInt()
  @IsOptional()
  toleranciaTemperatura?: number;

  @ApiProperty({
    example: true,
    description: 'Indica si la planta es de ciclo',
  })
  @IsBoolean()
  @IsOptional()
  ciclo?: boolean;

  @ApiProperty({
    example: '1.5m',
    description: 'Altura de la planta',
  })
  @IsString()
  @IsOptional()
  altura?: string;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la especie de la planta',
  })
  @IsInt()
  @IsOptional()
  idEspecie?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del color de la planta',
  })
  @IsInt()
  @IsOptional()
  idColor?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del fotoperiodo de la planta',
  })
  @IsInt()
  @IsOptional()
  idFotoperiodo?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de riego de la planta',
  })
  @IsInt()
  @IsOptional()
  idTipoRiego?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del hábito de crecimiento de la planta',
  })
  @IsInt()
  @IsOptional()
  idHabitoCrecimiento?: number;
}
