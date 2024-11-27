import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginDto } from '../dto/login.dto';
import { UsuariosService } from 'src/usuarios/service/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { toOutputUserDTO } from 'src/usuarios/mapper/entitty-to-dto-usuarios';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(
    nombreUsuario: string,
    contrasena: string,
  ): Promise<any> {
    const user = await this.usuariosService.findByUsername(nombreUsuario);
    if (user && (await bcrypt.compare(contrasena, user.contrasena))) {
      return {
        id: user.id,
        username: user.nombreUsuario,
        rol: user.rol.nombre,
      };
    }
    return null;
  }
  async register(createUsuarioDto: CreateUsuarioDto) {
    const salt = 10;
    createUsuarioDto.contrasena = await bcrypt.hash(
      createUsuarioDto.contrasena,
      salt,
    );
    return this.usuariosService.createUser(createUsuarioDto);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    const user = await this.validarUsuario(username, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      username: user.nombreUsuario,
      sub: user.id,
      role: user.rol.nombre,
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
