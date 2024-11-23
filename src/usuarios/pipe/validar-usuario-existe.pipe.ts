import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { QueryCarroDto } from 'src/carro-compras/dto/get-query-carro.dto';

@Injectable()
export class ValidarUsuarioExistePipe implements PipeTransform {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'number') {
      const existe: boolean = await this.usuarioRepository.existsBy({
        id: value,
      });
      if (!existe) {
        throw new NotFoundException('No existe un usuario con ese ID.');
      }
    }
    else if (value instanceof QueryCarroDto) {
      if (value.idUsuario) {
        const existe: boolean = await this.usuarioRepository.existsBy({
          id: value.idUsuario,
        });
        if (!existe) {
          throw new NotFoundException('No existe un usuario con ese ID.');
        }
        else {
          return value
        }
      }
    }
    return value;
  }
}
