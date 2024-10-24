import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginDto } from '../dto/login.dto';
export declare class AuthService {
    register(createUser: CreateUsuarioDto): {
        message: string;
    };
    login(loginDto: LoginDto): {
        message: string;
    };
}
