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
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const existe: boolean = await this.usuarioRepository.existsBy({
      id: value,
    });
    if (!existe) {
      throw new NotFoundException('No existe un usuario con ese ID.');
    }
    return value;
  }
}
