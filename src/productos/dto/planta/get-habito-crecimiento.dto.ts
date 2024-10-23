import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetHabitoCrecimientoDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del hábito de crecimiento',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Hábito de crecimiento',
    description: 'Nombre del hábito de crecimiento',
  })
  @IsString()
  habitoCrecimiento: string;
}
