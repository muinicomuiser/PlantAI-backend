import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {

  @ApiProperty({ example: 'New User' })
  @IsString()
  public name: string;

  @ApiProperty({ example: 'qwerty' })
  @IsString()
  public password: string;

  @ApiProperty({ example: 'newuser@gmail.com' })
  @IsEmail()
  public email: string;

  constructor(name: string, password: string, email: string) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}