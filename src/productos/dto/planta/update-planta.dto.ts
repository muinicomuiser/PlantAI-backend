import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePlantaDto {
  @ApiProperty({
    example: true,
    description: 'Indica si la planta es amigable con las mascotas',
  })
  @IsBoolean()
  @IsOptional()
  petFriendly?: boolean;

  @ApiProperty({
    example: true,
    description: 'Indica si la planta es de ciclo',
  })
  @IsBoolean()
  @IsOptional()
  ciclo?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Especie de la planta',
  })
  @MaxLength(50)
  @IsString()
  @IsOptional()
  especie?: string;

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

  @ApiProperty({
    example: 1,
    description: 'Identificador del tamaño de la planta',
  })
  @IsInt()
  @IsOptional()
  idTamano?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la tolerancia a la temperatura de la planta',
  })
  @IsInt()
  @IsOptional()
  idToleranciaTemperatura?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del entorno de la planta',
  })
  @IsInt()
  @IsOptional()
  idEntorno?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la iluminación de la planta',
  })
  @IsInt()
  @IsOptional()
  idIluminacion?: number;
}
