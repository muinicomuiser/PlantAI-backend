import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { Producto } from '../entities/producto.entity';

export class ProductoMapperAux {
  static entityToDtoAux(producto: Producto): GetProductoDto {
    console.log(producto);
    const productoDto = new GetProductoDto();
    productoDto.id = producto.id;
    productoDto.SKU = producto.SKU;
    productoDto.nombre = producto.nombre;
    productoDto.idCategoria = producto.idCategoria;
    productoDto.precio = producto.precio;
    productoDto.descripcion = producto.descripcion;
    productoDto.imagen = producto.imagen;
    productoDto.cantidad = producto.cantidad;
    productoDto.unidadesVendidas = producto.unidadesVendidas;
    productoDto.puntuacion = producto.puntuacion;
    productoDto.ancho = producto.ancho;
    productoDto.alto = producto.alto;
    productoDto.largo = producto.largo;
    productoDto.peso = producto.peso;
    return productoDto;
  }
}
