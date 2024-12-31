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
import { Not, Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { OutputUserDTO } from 'src/usuarios/dto/output-userDTO';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { JwtPayload } from '../guards/jwt-auth.guard/roles.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) { }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    try {
      const { usernameOrEmail, password } = loginDto;

      const user = await this.userRepository.findOne({
        where: [
          {
            nombreUsuario: usernameOrEmail,
            rol: {
              id: Not(4),
            },
          }, {
            email: usernameOrEmail,
            rol: {
              id: Not(4),
            },
          }],
        relations: ['rol'],
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Verificar contraseña
      const isPasswordValid = await this.validatePassword(
        password,
        user.contrasena,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      const payload = this.createTokenPayload(user);
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'defaultSecretKey',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });

      return { access_token: token };
    }
    catch (error) {
      throw new BadRequestException('Error en el login')
    }
  }

  private async validatePassword(
    plainPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    // Verificar si la contraseña almacenada está encriptada (bcrypt)
    const isEncrypted =
      storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2a$');

    if (isEncrypted) {
      // Comparar usando bcrypt
      return bcrypt.compare(plainPassword, storedPassword);
    }

    // Comparar contraseñas sin encriptar (usuarios antiguos)
    return plainPassword === storedPassword;
  }

  private createTokenPayload(user: Usuario): JwtPayload {
    return {
      sub: user.id,
      username: user.nombreUsuario,
      role: user.rol?.nombre, // Asegúrate de enviar solo el nombre del rol
    };
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
        where: { id: 3 }, // <-- Los usuarios nuevos registrados quedan siempre como Cliente
      });
      if (!rol) {
        throw new NotFoundException(
          `Rol con ID ${3} no existe`,
        );
      }
      // editar usuario si es visitante
      const user = await this.usuariosService.findUserByEmailAddress(
        createUsuarioDto.email,
      );
      if (user && user.rol.id === 4) {
        return await this.usuariosService.updateGuestUser(user.id, createUsuarioDto);
      }
      //pasar rol al metodo de crea
      return this.usuariosService.createUser(createUsuarioDto, rol);
    } catch (error) {
      throw new BadRequestException('Error al registrar usuario');
    }
  }
}
