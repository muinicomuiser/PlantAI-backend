import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty({ example: 'New Name' })
    public name?: string;
    @ApiProperty({ example: 'asdfg' })
    public password?: string;
    @ApiProperty({ example: 'updateduser@gmail.com' })
    public email?: string;
}
