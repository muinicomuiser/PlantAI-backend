import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateMedioPagoDto {
  @ApiProperty({
    example: 1,
    description: 'ID del medio de pago a asociar con el usuario',
  })
  @IsNotEmpty()
  @IsInt()
  medioPagoId: number;
}
