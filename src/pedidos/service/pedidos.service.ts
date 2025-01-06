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
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/service/usuarios.service';
import { Direccion } from 'src/usuarios/entities/direccion.entity';
import { GetCarroProductoDto } from 'src/carro-compras/dto/get-carro-producto.dto';

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
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @Inject(CarroComprasService)
    private readonly carroComprasService: CarroComprasService,

  ) { }

  async create(
    idUsuario: number,
    createPedidoDto: CreatePedidoDto,
  ): Promise<GetPedidoDto> {
    try {

      // Validar índice de dirección guardada, si aplica
      if (!createPedidoDto.direccionEnvio) {
        await this.validarIndiceDireccion(idUsuario, createPedidoDto.idxDireccion)
      }

      // Cerrar carro del usuario
      const carroCerrado: GetCarroComprasDto =
        await this.carroComprasService.closeCarro(idUsuario, createPedidoDto);

      // Guardar pedido
      const pedidoGuardado = await this.guardarPedido(createPedidoDto, carroCerrado.id, idUsuario);

      // Asociar dirección nueva o guardada al pedido
      const direccion: DireccionEnvio = createPedidoDto.direccionEnvio
        ? await this.guardarDireccion(createPedidoDto, pedidoGuardado.id)
        : await this.direccionRegistrada(idUsuario, createPedidoDto.idxDireccion, pedidoGuardado.id)

      // Registrar productos del pedido
      const productosPedido: ProductoPedido[] = await this.guardarProductosPedido(carroCerrado.carroProductos, pedidoGuardado.id)

      // Crear carro nuevo activo al usuario
      if (carroCerrado) {
        await this.carroComprasService.createCarro(idUsuario);
      }

      // Dto salida
      pedidoGuardado.productosPedido = productosPedido;
      pedidoGuardado.direccionEnvio = direccion;
      return mapperPedido.toDto(pedidoGuardado);
    } catch (error) {
      throw new BadRequestException('Error al crear el pedido');
    }
  }

  private async validarIndiceDireccion(idUsuario: number, idxDireccion: number): Promise<void> {
    try {
      const usuario: Usuario = await this.usuarioRepository.findOne({
        where: { id: idUsuario },
        relations: ['direccion']
      });
      if (usuario.direccion.length <= idxDireccion) {
        throw new BadRequestException('Error al utilizar dirección registrada')
      }
    }
    catch (error) {
      throw new BadRequestException('Error al utilizar dirección registrada')
    }
  }

  private async guardarDireccion(createPedidoDto: CreatePedidoDto, idPedido: number): Promise<DireccionEnvio> {
    try {
      const nuevaDireccion: DireccionEnvio = Object.assign(
        new DireccionEnvio(),
        createPedidoDto.direccionEnvio,
      );
      nuevaDireccion.idPedido = idPedido;
      return await this.direccionEnvioRepository.save(nuevaDireccion);
    }
    catch (error) {
      throw new BadRequestException('Error al guardar la dirección')
    }
  }

  /**Obtiene la dirección, dentro del conjunto de direcciones del usuario, correspondiente al índice ingresado. */
  private async direccionRegistrada(idUsuario: number, idxDireccion: number, idPedido: number): Promise<DireccionEnvio> {
    try {
      const usuario: Usuario = await this.usuarioRepository.findOne({
        where: { id: idUsuario },
        relations: ['direccion']
      });

      const direccionUsuario: Direccion = usuario.direccion[idxDireccion];
      const direccionEnvio: DireccionEnvio = new DireccionEnvio()
      direccionEnvio.calle = direccionUsuario.calle;
      direccionEnvio.comuna = direccionUsuario.comuna
      direccionEnvio.departamento = direccionUsuario.departamento;
      direccionEnvio.idPedido = idPedido
      direccionEnvio.numero = direccionUsuario.numero;
      direccionEnvio.referencia = direccionUsuario.referencia
      return await this.direccionEnvioRepository.save(direccionEnvio);
    }
    catch (error) {
      throw new BadRequestException('Error al utilizar dirección registrada')
    }
  }

  private async guardarPedido(createPedidoDto: CreatePedidoDto, idCarro: number, idUsuario: number): Promise<Pedido> {
    try {
      const newPedido = Object.assign(new Pedido(), createPedidoDto);
      newPedido.idCarro = idCarro;
      newPedido.idUsuario = idUsuario;
      newPedido.direccionEnvio = null;
      return await this.pedidoRepository.save(newPedido);
    }
    catch (error) {
      throw new BadRequestException('Error al guardar pedido')
    }
  }

  private async guardarProductosPedido(carroProductos: GetCarroProductoDto[], idPedido: number): Promise<ProductoPedido[]> {
    try {
      const productosPedido: ProductoPedido[] = carroProductos.map(
        (carroProducto) => {
          const productoPedido: ProductoPedido = new ProductoPedido();
          productoPedido.cantidad = carroProducto.cantidadProducto;
          productoPedido.idPedido = idPedido;
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
      return newProductosPedido;
    }
    catch (error) {
      throw new BadRequestException('Error al registrar productos del pedido')
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
