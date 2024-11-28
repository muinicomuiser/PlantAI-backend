import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMaceteroDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsInt()
  @IsOptional()
  idMarca?: number;
  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de macetero',
  })
  @IsInt()
  @IsOptional()
  idTipoMacetero?: number;
  @ApiProperty({
    example: 'cemento',
    description: 'tipo de material',
  })
  @IsString()
  @IsOptional()
  material?: string;
  @ApiProperty({
    example: 'redondo',
    description: 'forma del macetero',
  })
  @IsString()
  @IsOptional()
  forma: string;
  @ApiProperty({
    example: 30,
    description: 'diametro del macetero',
  })
  @IsInt()
  @IsOptional()
  diametro?: number;
  @ApiProperty({
    example: 30,
    description: 'litros',
  })
  @IsInt()
  @IsOptional()
  litros?: number;
}
