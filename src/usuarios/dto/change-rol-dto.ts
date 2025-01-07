import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty({ example: 2, description: 'ID del nuevo rol' })
  @IsInt()
  @IsPositive()
  idRol: number;
}
