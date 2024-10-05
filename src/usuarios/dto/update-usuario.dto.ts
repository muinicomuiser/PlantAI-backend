import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

  @ApiProperty({ example: 'New Name' })
  @IsString()
  public name?: string;

  @ApiProperty({ example: 'asdfg' })
  @IsString()
  public password?: string;

  @ApiProperty({ example: 'updateduser@gmail.com' })
  @IsEmail()
  public email?: string;
}
