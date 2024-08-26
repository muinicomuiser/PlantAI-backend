import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty({ default: '' })
    public name?: string;
    @ApiProperty({ default: '' })
    public password?: string;
    @ApiProperty({ default: '' })
    public email?: string;
}
