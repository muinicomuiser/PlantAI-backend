import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginDto } from '../dto/login.dto';
import { UsuariosService } from 'src/usuarios/service/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { toOutputUserDTO } from 'src/usuarios/mapper/entitty-to-dto-usuarios';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/usuarios/entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
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
    // buscar rol en base
    const rol = await this.rolRepository.findOne({
      where: { id: createUsuarioDto.idRol },
    });
    if (!rol) {
      throw new NotFoundException(
        `Rol con ID ${createUsuarioDto.idRol} no existe`,
      );
    }
    //pasar rol al metodo de crea
    return this.usuariosService.createUser(createUsuarioDto, rol);
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
