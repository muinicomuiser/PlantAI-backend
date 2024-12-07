import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'base64' })
  base64Content?: string;
}
