import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
export declare class ValidarUsuarioExistePipe implements PipeTransform {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
