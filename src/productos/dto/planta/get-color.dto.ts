import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetColorDto {
  @ApiProperty({ example: 1, description: 'Identificador único del color' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Verde', description: 'Nombre del color' })
  @IsString()
  color: string;
}
