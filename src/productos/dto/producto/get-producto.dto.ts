import { ApiProperty } from '@nestjs/swagger';
import { GetAccesorioDto } from '../accesorio/get-accesorio.dto';
import { GetCategoriaDto } from '../categoria/get-categoria.dto';
import { GetImagenDto } from '../imagen/get-imagen.dto';
import { GetInsumoDto } from '../insumo/get-insumo.dto';
import { GetMaceteroDto } from '../macetero/get-macetero.dto';
import { GetPlantaDto } from '../planta/get-planta.dto';
import { GetPromocionProductoDto } from 'src/promociones/dto/get_promocion_producto.dto';

export class GetProductoDto {
  @ApiProperty({ example: 1, description: 'Identificador único del producto' })
  id: number;

  @ApiProperty({ example: 'ABC123', description: 'SKU del producto' })
  SKU: string;

  @ApiProperty({
    example: 'Macetero de cerámica',
    description: 'Nombre del producto',
  })
  nombre: string;

  @ApiProperty({
    example: 2,
    description: 'Identificador de la categoría del producto',
  })
  idCategoria: number;

  @ApiProperty({ example: 15000, description: 'Precio del producto' })
  precio: number;

  /**Es opcional, porque para el caso de cupones solo se le dará un valor cuando se active el cupón. 
   * Para el caso de las promociones tradicionales, el precio final se enviará siempre.
  */
  @ApiProperty({ example: 11990, description: 'Precio del producto después de aplicar descuento' })
  precioFinal?: number;

  @ApiProperty({
    example: 'Macetero hecho a mano',
    description: 'Descripción detallada del producto',
  })
  descripcion: string;

  // @ApiProperty({
  //   example: 'macetero.jpg',
  //   description: 'URL de la imagen del producto',
  // })
  // @IsString()
  // imagen: string;

  @ApiProperty({ example: 50, description: 'Cantidad disponible del producto' })
  stock: number;

  @ApiProperty({
    example: 20,
    description: 'Número de unidades vendidas del producto',
  })
  unidadesVendidas: number;

  @ApiProperty({
    example: 4.5,
    description: 'Puntuación promedio del producto',
  })
  puntuacion: number;

  @ApiProperty({
    example: 10,
    description: 'Ancho del producto en milimetros',
  })
  ancho: number;

  @ApiProperty({ example: 20, description: 'Alto del producto en milimetros' })
  alto: number;

  @ApiProperty({
    example: 30,
    description: 'Largo del producto en milimetros',
  })
  largo: number;

  @ApiProperty({ example: 2.5, description: 'Peso del producto en kilogramos' })
  peso: number;

  @ApiProperty({
    type: GetCategoriaDto,
    description: 'Información de la categoría asociada al producto',
  })
  categoria: GetCategoriaDto;

  // @ApiProperty({
  //   type: [EtiquetaDto],
  //   description: 'Etiquetas asociadas al producto',
  // })
  // etiquetas: EtiquetaDto[];

  @ApiProperty({
    example: true,
    description: 'Indica si el producto está habilitado',
  })
  habilitado: boolean;

  @ApiProperty({
    type: [GetImagenDto],
  })
  imagenes: GetImagenDto[]

  @ApiProperty({
    type: GetPlantaDto,
    description: 'Información de la planta asociada al producto',
    required: false,
  })
  planta?: GetPlantaDto;

  @ApiProperty({
    type: GetMaceteroDto,
    description: 'Información del macetero asociado al producto',
    required: false,
  })
  macetero?: GetMaceteroDto;

  @ApiProperty({
    type: GetAccesorioDto,
    description: 'Información del accesorio asociado al producto',
    required: false,
  })
  accesorio?: GetAccesorioDto;

  @ApiProperty({
    type: GetInsumoDto,
    description: 'Información del insumo asociado al producto',
    required: false,
  })
  insumo?: GetInsumoDto;

  /**Promociones que aplican el descuento mayor. */
  @ApiProperty({
    type: [GetPromocionProductoDto],
  })
  promocionesDestacadas?: GetPromocionProductoDto[]
}
