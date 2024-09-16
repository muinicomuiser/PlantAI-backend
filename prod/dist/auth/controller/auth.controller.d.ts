import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUser: CreateUsuarioDto): {
        message: string;
    };
    login(loginDto: LoginDto): {
        message: string;
    };
}
