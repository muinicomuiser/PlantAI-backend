import { PromocionMapper } from 'src/promociones/mapper/promocion.mapper';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { Producto } from '../entities/producto.entity';

export class ProductoMapper {
  static entityToDto(producto: Producto): GetProductoDto {
    const productoDto = new GetProductoDto();
    productoDto.id = producto.id;
    productoDto.SKU = producto.SKU;
    productoDto.nombre = producto.nombre;
    productoDto.idCategoria = producto.categoria.id;
    productoDto.precio = producto.precio;
    productoDto.descripcion = producto.descripcion;
    productoDto.imagenes = producto.imagenes;
    productoDto.stock = producto.stock;
    productoDto.unidadesVendidas = producto.unidadesVendidas;
    productoDto.puntuacion = producto.puntuacion;
    productoDto.ancho = producto.ancho;
    productoDto.alto = producto.alto;
    productoDto.largo = producto.largo;
    productoDto.peso = producto.peso;
    productoDto.habilitado = producto.habilitado;

    if (producto.categoria) {
      productoDto.categoria = {
        id: producto.categoria.id,
        categoria: producto.categoria.categoria,
      };
      if (producto.planta) {
        productoDto.planta = {
          idProducto: producto.planta.idProducto,
          petFriendly: producto.planta.petFriendly,
          ciclo: producto.planta.ciclo,
          especie: producto.planta.especie,
          idColor: producto.planta.idColor,
          idFotoperiodo: producto.planta.idFotoperiodo,
          idTipoRiego: producto.planta.idTipoRiego,
          idHabitoCrecimiento: producto.planta.idHabitoCrecimiento,
          habitoCrecimiento: producto.planta.habitoCrecimiento.crecimiento,
          color: producto.planta.color.color,
          fotoPeriodo: producto.planta.fotoPeriodo.tipoFotoperiodo,
          tipoRiego: producto.planta.tipoRiego.tipoRiego,
          idToleranciaTemperatura: producto.planta.idToleranciaTemperatura,
          idEntorno: producto.planta.idEntorno,
          idIluminacion: producto.planta.idIluminacion,
          idTamano: producto.planta.idTamano,
          entorno: producto.planta.entorno.entorno,
          iluminacion: producto.planta.iluminacion.iluminacion,
          toleranciaTemperatura:
            producto.planta.toleranciaTemperatura.toleranciaTemperatura,
          tamano: producto.planta.tamano.tamano,
        };
      }
    }
    if (producto.macetero) {
      productoDto.macetero = {
        idProducto: producto.macetero.idProducto,
        idMarca: producto.macetero.idMarca,
        idTipoMacetero: producto.macetero.idTipoMacetero,
        material: producto.macetero.material,
        forma: producto.macetero.forma,
        diametro: producto.macetero.diametro,
        litros: producto.macetero.litros,
        marca: producto.macetero.marca.nombre,
        tipoMacetero: producto.macetero.tipoMacetero.tipo,
      };
    }
    if (producto.accesorio) {
      productoDto.accesorio = {
        idProducto: producto.accesorio.idProducto,
        idMarca: producto.accesorio.idMarca,
        idTipoAccesorio: producto.accesorio.idTipoAccesorio,
        idColor: producto.accesorio.idColor,
        marca: producto.accesorio.marca.nombre,
        tipoAccesorio: producto.accesorio.tipoAccesorio.tipo,
        color: producto.accesorio.color.color,
      };
    }
    if (producto.insumo) {
      productoDto.insumo = {
        idProducto: producto.insumo.idProducto,
        idTipoInsumo: producto.insumo.idTipoInsumo,
        idMarca: producto.insumo.idMarca,
        tipoInsumo: producto.insumo.tipoInsumo.tipoInsumo,
        marca: producto.insumo.marca.nombre,
      };
    }
    if (producto.promociones) {
      productoDto.promocionesDestacadas = PromocionMapper.entitiesToPromocionProductoDtos(producto.promociones);
    }
    return productoDto;
  }

  static entitiesToDtos(productos: Producto[]): GetProductoDto[] {
    return productos.map(producto => ProductoMapper.entityToDto(producto))
  }

  static DtoToProducto(
    productoDto: CreateProductoDto | UpdateProductoDto,
  ): Producto {
    const producto = new Producto();
    producto.SKU = productoDto.SKU;
    producto.nombre = productoDto.nombre;
    producto.precio = productoDto.precio;
    producto.descripcion = productoDto.descripcion;
    producto.idCategoria = productoDto.idCategoria;
    // producto.imagen = productoDto.imagen;
    producto.stock = productoDto.stock;
    producto.unidadesVendidas = productoDto.unidadesVendidas;
    producto.puntuacion = productoDto.puntuacion;
    producto.ancho = productoDto.ancho;
    producto.alto = productoDto.alto;
    producto.largo = productoDto.largo;
    producto.peso = productoDto.peso;
    producto.habilitado = productoDto.habilitado;
    return producto;
  }
}