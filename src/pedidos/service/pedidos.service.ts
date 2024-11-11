import { Injectable } from '@nestjs/common';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    return this.pedidoRepository.save(createPedidoDto);
  }

  /**Retorna todos los pedidos */
  async findAll() {
    return await this.pedidoRepository.find();
  }

  /**Retorna un pedido según su id */
  findOne(id: number) {
    const pedido = this.pedidoRepository.findOne({
      where: { id: id },
    });
    return pedido;
  }

  /**Modifica un pedido según su id */
  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return await this.pedidoRepository.update(id, updatePedidoDto);
  }

  /**Elimina un pedido según su id */
  async remove(id: number) {
    return await this.pedidoRepository.delete(id);
  }
}
