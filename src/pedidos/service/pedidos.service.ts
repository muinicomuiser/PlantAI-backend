import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PEDIDOS_RELATIONS } from '../shared/constants/pedidos.constants';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { mapperPedido } from '../mapper/pedido.mapper';
import { DeleteResultDto } from '../dto/delete-result.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<GetPedidoDto> {
    const newPedido = await this.pedidoRepository.save(createPedidoDto);
    return mapperPedido.toDto(newPedido);
  }

  /**Retorna todos los pedidos */
  async findAll(): Promise<GetPedidoDto[]> {
    const pedidos = await this.pedidoRepository.find({
      relations: PEDIDOS_RELATIONS,
    });
    return pedidos.map((pedido) => mapperPedido.toDto(pedido));
  }

  /**Retorna un pedido según su id */
  async findOne(id: number): Promise<GetPedidoDto> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: id },
      relations: PEDIDOS_RELATIONS,
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
    return mapperPedido.toDto(pedido);
  }

  /**Modifica un pedido según su id */
  async update(
    id: number,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<GetPedidoDto> {
    const updatePedido = await this.pedidoRepository.update(
      id,
      updatePedidoDto,
    );
    if (updatePedido.affected === 0) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
    return await this.findOne(id);
  }
  /**Elimina un pedido según su id */
  async remove(
    id: number,
  ): Promise<{ deleteResult: DeleteResultDto; pedido: GetPedidoDto }> {
    const pedido = await this.findOne(id);
    const deleteResult: DeleteResultDto =
      await this.pedidoRepository.delete(id);
    return { deleteResult, pedido };
  }
}
