import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateInsumoDto {
  @ApiProperty({
    example: 1,
    description: 'identificador del tipo insumo',
  })
  @IsInt()
  @IsOptional()
  idTipoInsumo?: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsInt()
  @IsOptional()
  idMarca?: number;
}
