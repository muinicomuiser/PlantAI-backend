import { ApiProperty } from '@nestjs/swagger';

export class DeleteResultDto {
  @ApiProperty({ type: 'any' })
  raw: any;
  @ApiProperty({ type: 'number' })
  affected?: number;
}
