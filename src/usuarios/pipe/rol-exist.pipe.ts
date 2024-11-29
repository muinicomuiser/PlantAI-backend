import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async transform(idRol: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { id: idRol } });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${idRol} no existe`);
    }
    return rol;
  }
}
