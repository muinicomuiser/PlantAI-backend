import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({ example: 'New User' })
    public name: string;
    @ApiProperty({ example: 'qwerty' })
    public password: string;
    @ApiProperty({ example: 'newuser@gmail.com' })
    public email: string;

    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
