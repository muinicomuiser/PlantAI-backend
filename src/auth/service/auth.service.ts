import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { Rol } from 'src/usuarios/entities/rol.entity';
import { UsuariosService } from 'src/usuarios/service/usuarios.service';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { OutputUserDTO } from 'src/usuarios/dto/output-userDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  private createTokenPayload(user: any) {
    return {
      username: user.username,
      sub: user.id,
      role: user.rol,
    };
  }
  async validarUsuario(
    nombreUsuario: string,
    contrasena: string,
  ): Promise<any> {
    const user = await this.usuariosService.findByUsername(nombreUsuario);
    if (!user) {
      return null;
    }
    // poder gestionar usuarios de legado con contraseñas  texto plano:
    const isPasswordValid =
      user.contrasena.length === 60
        ? await bcrypt.compare(contrasena, user.contrasena)
        : user.contrasena === contrasena;
    if (user.contrasena.length !== 60) {
      console.warn(
        `usuario con ID ${user.id} no tiene cifrada su contraseña. Considerar actualuizar`,
      );
    }
    if (isPasswordValid) {
      return {
        id: user.id,
        username: user.nombreUsuario,
        rol: user.rol.nombre,
      };
    }
    return null;
  }
  async register(createUsuarioDto: CreateUsuarioDto): Promise<OutputUserDTO> {
    try {
      const salt = 10;
      createUsuarioDto.contrasena = await bcrypt.hash(
        createUsuarioDto.contrasena,
        salt,
      );
      // buscar rol en base
      const rol = await this.rolRepository.findOne({
        where: { id: createUsuarioDto.idRol }, // <-- Los usuarios nuevos registrados quedan siempre como Cliente
      });
      if (!rol) {
        throw new NotFoundException(
          `Rol con ID ${createUsuarioDto.idRol} no existe`,
        );
      }
      //pasar rol al metodo de crea
      return this.usuariosService.createUser(createUsuarioDto, rol);
    } catch (error) {
      throw new BadRequestException('Error al registrar usuario');
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    const user = await this.validarUsuario(username, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = this.createTokenPayload(user);
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    return { access_token: token };
  }
}
