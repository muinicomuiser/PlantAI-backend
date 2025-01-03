import { ApiProperty } from '@nestjs/swagger';
import { OutputUserDTO } from './output-userDTO';

export class OutputGuestUserDTO extends OutputUserDTO {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expToken: number
}
