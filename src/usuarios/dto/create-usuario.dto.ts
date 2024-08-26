import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({ default: 'New User' })
    public name: string;
    @ApiProperty({ default: 'qwerty' })
    public password: string;
    @ApiProperty({ default: 'newuser@gmail.com' })
    public email: string;

    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
