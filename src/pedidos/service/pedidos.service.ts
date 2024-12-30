import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCarroComprasDto } from 'src/carro-compras/dto/get-carro-compras.dto';
import { CarroComprasService } from 'src/carro-compras/service/carro-compras.service';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { Pedido } from '../entities/pedido.entity';
import { ProductoPedido } from '../entities/productos_pedido.entity';
import { mapperPedido } from '../mapper/pedido.mapper';
import { PEDIDOS_RELATIONS } from '../shared/constants/pedidos.constants';
import { CreateDireccionEnvioDto } from '../dto/create-direccion-envio.dto';
import { DireccionEnvio } from '../entities/direccion-envio.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(ProductoPedido)
    private productoPedidoRepository: Repository<ProductoPedido>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(DireccionEnvio)
    private direccionEnvioRepository: Repository<DireccionEnvio>,
    @Inject(CarroComprasService)
    private readonly carroComprasService: CarroComprasService,
  ) {}

  async create(
    idUsuario: number,
    createPedidoDto: CreatePedidoDto,
  ): Promise<GetPedidoDto> {
    try {
      //Cerrar carro
      const carroCerrado: GetCarroComprasDto =
        await this.carroComprasService.closeCarro(idUsuario, createPedidoDto);
      //Crear carro nuevo al usuario
      await this.carroComprasService.createCarro(idUsuario);
      //Guardar pedido
      const newPedido = Object.assign(new Pedido(), createPedidoDto);
      newPedido.idCarro = carroCerrado.id;
      newPedido.idUsuario = idUsuario;
      newPedido.direccionEnvio = null;
      const pedidoGuardado = await this.pedidoRepository.save(newPedido);
      console.log(pedidoGuardado);
      const nuevaDireccion: DireccionEnvio = Object.assign(
        new DireccionEnvio(),
        createPedidoDto.direccionEnvio,
      );
      nuevaDireccion.idPedido = pedidoGuardado.id;
      const direccionGuardada =
        await this.direccionEnvioRepository.save(nuevaDireccion);
      //Llenar Productos-Pedido (Pasar a mapper)
      const productosPedido: ProductoPedido[] = carroCerrado.carroProductos.map(
        (carroProducto) => {
          const productoPedido: ProductoPedido = new ProductoPedido();
          productoPedido.cantidad = carroProducto.cantidadProducto;
          productoPedido.idPedido = pedidoGuardado.id;
          productoPedido.idProducto = carroProducto.producto.id;
          productoPedido.precioCompraUnidad = carroProducto.producto.precio;
          return productoPedido;
        },
      );
      const newProductosPedido =
        await this.productoPedidoRepository.save(productosPedido);
      await Promise.all(
        newProductosPedido.map(async (productoPedido) => {
          const producto: Producto = await this.productoRepository.findOneBy({
            id: productoPedido.idProducto,
          });
          producto.unidadesVendidas += productoPedido.cantidad;
          producto.stock -= productoPedido.cantidad;
          await this.productoRepository.save(producto);
        }),
      );
      pedidoGuardado.productosPedido = newProductosPedido;
      pedidoGuardado.direccionEnvio = direccionGuardada;
      return mapperPedido.toDto(pedidoGuardado);
    } catch (error) {
      throw new BadRequestException('Error al crear el pedido');
    }
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
  // async update(
  //   id: number,
  //   updatePedidoDto: UpdatePedidoDto,
  // ): Promise<GetPedidoDto> {
  //   const updatePedido = await this.pedidoRepository.update(
  //     id,
  //     updatePedidoDto,
  //   );
  //   if (updatePedido.affected === 0) {
  //     throw new NotFoundException(`Pedido con id ${id} no encontrado`);
  //   }
  //   return await this.findOne(id);
  // }

  /**Elimina un pedido según su id */
  // async remove(
  //   id: number,
  // ): Promise<{ deleteResult: DeleteResultDto; pedido: GetPedidoDto }> {
  //   const pedido = await this.findOne(id);
  //   const deleteResult: DeleteResultDto =
  //     await this.pedidoRepository.delete(id);
  //   return { deleteResult, pedido };
  // }
}
