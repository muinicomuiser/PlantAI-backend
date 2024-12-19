import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'ID del producto a evaluar' })
  @IsInt()
  @IsNotEmpty()
  idProducto: number;

  @ApiProperty({ example: 5, description: 'Puntaje entre 1 y 5' })
  @IsInt()
  @Min(1, { message: 'El puntaje debe ser al menos 1' })
  @Max(5, { message: 'El puntaje no puede ser mayor a 5' })
  @IsNotEmpty()
  puntuacion: number;

  @ApiProperty({
    example: 'Excelente producto',
    description: 'Comentario opcional',
  })
  @IsString()
  @IsOptional()
  comentario?: string;
}
