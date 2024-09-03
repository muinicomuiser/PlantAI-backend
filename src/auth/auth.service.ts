import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(createUser: CreateUsuarioDto){
    return {message: 'Usuario creado'};
  }

  login(loginDto: LoginDto){
    return {message: 'Usuario logueado'};
  }
}
