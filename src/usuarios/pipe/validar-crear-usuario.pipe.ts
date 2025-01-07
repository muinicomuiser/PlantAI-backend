import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class ValidarCrearUsuarioPipe implements PipeTransform {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { id, email, nombreUsuario } = value;

    // Validar email
    if (email) {
      const emailEnUso = await this.usuarioRepository.findOne({
        where: {
          email,
          rol: {
            id: Not(4),
          },
        },
        select: ['id'],
      });

      if (emailEnUso && emailEnUso.id !== id) {
        throw new BadRequestException('El email ya está registrado');
      }
    }

    // Validar nombre de usuario
    if (nombreUsuario) {
      const nombreUsuarioEnUso = await this.usuarioRepository.findOne({
        where: {
          nombreUsuario,
          // rol: {
          //   id: Not(4),  // Aunque sea invitado, el nombre de usuario no debería repetirse, o no?? como se generará automáticamente
          // },
        },
        select: ['id'],
      });

      if (nombreUsuarioEnUso && nombreUsuarioEnUso.id !== id) {
        throw new BadRequestException(
          'El nombre de usuario ya está registrado',
        );
      }
    }

    return value;
  }
}
