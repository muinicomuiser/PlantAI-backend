import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

/**Valida que no no estén registrados el email y el nombre de usuario */
@Injectable()
export class ValidarCrearUsuarioPipe implements PipeTransform {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }
  async transform(value: any, metadata: ArgumentMetadata) {
    const emailExiste: boolean = await this.usuarioRepository.existsBy({
      email: value.email
    })

    if (emailExiste) {
      throw new BadRequestException('El email ya está registrado')
    }
    const nombreUsuarioExiste: boolean = await this.usuarioRepository.existsBy({
      nombreUsuario: value.nombreUsuario
    })

    if (nombreUsuarioExiste) {
      throw new BadRequestException('El nombre de usuario ya está registrado')
    }
    return value;
  }
}
