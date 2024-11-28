import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class ValidarUsuarioExistePipe implements PipeTransform {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const usuarioExiste = await this.usuarioRepository.exist({
      where: { id: value },
    });
    if (!usuarioExiste) {
      throw new NotFoundException(`No existe un usuario con el ID ${value}.`);
    }
    return value;
  }
}
