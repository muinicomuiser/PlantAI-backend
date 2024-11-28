import { ProductoMapper } from 'src/productos/mapper/entity-to-dto-producto';
import { GetCarroProductoDto } from '../dto/get-carro-producto.dto';
import { CarroProducto } from '../entities/carro_producto.entity';
import { CarroCompra } from '../entities/carro.entity';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';

export class CarroComprasMapper {
  /**Recibe una entidad CarroProducto y la retorna como DTO. Convierte la entidad contenida Producto en DTO. */
  static carroProductoEntityToDto(
    carroProducto: CarroProducto,
  ): GetCarroProductoDto {
    const carroProductoDto: GetCarroProductoDto = new GetCarroProductoDto();
    carroProductoDto.cantidadProducto = carroProducto.cantidadProducto;
    carroProductoDto.producto = ProductoMapper.entityToDto(
      carroProducto.producto,
    );
    return carroProductoDto;
  }

  /**Recibe un array de entidad CarroProducto y retorna un array de DTO. Convierte la entidad contenida Producto en DTO. */
  static arrayCarroProductosEntityToDto(
    carroProductos: CarroProducto[],
  ): GetCarroProductoDto[] {
    return carroProductos.map((carroProducto) =>
      this.carroProductoEntityToDto(carroProducto),
    );
  }

  /**Recibe una entidad CarroCompra y la retorna como DTO.
   ** Convierte la entidad contenida CarroProducto en DTO.
   ** Calcula el precio total.
   */
  static carroEntityToDto(carro: CarroCompra): GetCarroComprasDto {
    const carroDto: GetCarroComprasDto = new GetCarroComprasDto();
    carroDto.id = carro.id;
    carroDto.idUsuario = carro.idUsuario;
    if (carro.carroProductos) {
      carroDto.carroProductos = this.arrayCarroProductosEntityToDto(
        carro.carroProductos,
      );
      carroDto.precioTotal = carroDto.carroProductos.reduce(
        (acumulador, valorActual) =>
          acumulador +
          valorActual.producto.precio * valorActual.cantidadProducto,
        0,
      );
    } else {
      carroDto.carroProductos = [];
    }
    carroDto.fecha_cierre = carro.fecha_cierre;
    carroDto.fecha_creacion = carro.fecha_creacion;
    return carroDto;
  }

  static arrayCarroEntityToDto(carros: CarroCompra[]): GetCarroComprasDto[] {
    return carros.map((carro) => CarroComprasMapper.carroEntityToDto(carro));
  }
}
