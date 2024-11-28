import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateAccesorioDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsInt()
  @IsOptional()
  idMarca?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de accesorio',
  })
  @IsInt()
  @IsOptional()
  idTipoAccesorio?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del color',
  })
  @IsInt()
  @IsOptional()
  idColor?: number;
}
