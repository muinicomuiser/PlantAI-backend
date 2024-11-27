import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroProducto } from 'src/carro-compras/entities/carro_producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { UpdateProductImageDto } from '../dto/producto/update-product-image.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { Accesorio } from '../entities/accesorios/accesorio.entity';
import { Insumo } from '../entities/insumos/insumo.entity';
import { Macetero } from '../entities/maceteros/macetero.entity';
import { Planta } from '../entities/plantas/planta.entity';
import { Producto } from '../entities/producto.entity';
import { ProductoMapperAux } from '../mapper/ent-to-dto-aux';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';
import { ImageService } from './imagen.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(CarroProducto)
    private readonly carroProductoRepository: Repository<CarroProducto>,
    private readonly imageService: ImageService
  ) { }
  /**Retorna el producto cuyo id coincida con el ingresado.*/
  async getById(id: number): Promise<GetProductoDto> {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
      relations: PRODUCTO_RELATIONS,
    });
    if (!producto) {
      throw new NotFoundException('No existe un producto con ese id.')
    }
    return ProductoMapper.entityToDto(producto);
  }

  /**Retorna el conjunto de productos que coincida con los filtros.*/
  getByFilters() {
    return { mensaje: 'endpoint en desarrollo' };
  }

  /**Retorna todos los productos registrados.*/
  async getAll(): Promise<GetProductoDto[]> {
    const productos = await this.productoRepository.find({
      relations: PRODUCTO_RELATIONS,
    });
    return productos.map((producto) => ProductoMapper.entityToDto(producto));
  }

  //
  async create(createProductoDto: CreateProductoDto): Promise<GetProductoDto> {
    const newProducto = await this.productoRepository.save(createProductoDto);
    return ProductoMapperAux.entityToDtoAux(newProducto);
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
    await this.productoRepository.update(id, updateProductoDto);
    return this.getById(id);
  }
  /**Elimina un producto según su id */
  async deleteOne(idProducto: number) {
    const carroProductosEncontrados: CarroProducto[] = await this.carroProductoRepository.find({
      where: {
        idProducto: idProducto
      }
    });
    const eliminados = await this.carroProductoRepository.remove(carroProductosEncontrados)
    const productoEncontrado: Producto = await this.productoRepository.findOne({
      where: {
        id: idProducto
      },
      relations: [...PRODUCTO_RELATIONS]
    })
    productoEncontrado.etiquetas = []
    if (productoEncontrado.planta) {
      await this.productoRepository.manager.getRepository<Planta>(Planta).remove(productoEncontrado.planta)
    }
    if (productoEncontrado.accesorio) {
      await this.productoRepository.manager.getRepository<Accesorio>(Accesorio).remove(productoEncontrado.accesorio)
    }
    if (productoEncontrado.insumo) {
      await this.productoRepository.manager.getRepository<Insumo>(Insumo).remove(productoEncontrado.insumo)
    }
    if (productoEncontrado.macetero) {
      await this.productoRepository.manager.getRepository<Macetero>(Macetero).remove(productoEncontrado.macetero)
    }
    return await this.productoRepository.remove(productoEncontrado);
  }

  /**Subir una imagen en Base64; guardar ruta en DB y SV estáticos*/
  async addProductImage(base64Content: UpdateProductImageDto, idProducto: number) {

    const rutaImagen = await this.imageService.addImage(base64Content.base64Content);

    await this.productoRepository.update(idProducto, { imagen: rutaImagen })

    return rutaImagen;
  }

  /**Actualiza una imagen en Base64; guardar ruta en DB y SV estáticos*/
  async updateProductImage(base64Content: UpdateProductImageDto, idProducto: number) {
    const producto = await this.productoRepository.findOne({
      where: { id: idProducto },
      relations: PRODUCTO_RELATIONS,
    });

    //reemplaza la ruta de la db por la ruta de la carpeta física
    const rutaArchivoActual = producto.imagen.replace(`${process.env.RUTA_ESTATICOS}`, `${process.env.RUTA_FISICA}/`);


    //actualiza la imagen en la carpeta física
    const rutaImagen = await this.imageService.updateImage(base64Content.base64Content, rutaArchivoActual);

    //actualiza la ruta de la imagen en la db
    await this.productoRepository.update(idProducto, { imagen: rutaImagen });

    return rutaImagen;
  }

  /**Elimina una imagen de un producto en Base64; borra la ruta de DB y el archivo de la ruta de estáticos*/

  async deleteProductImage(idProducto: number) {
    const producto = await this.productoRepository.findOne({
      where: { id: idProducto },
      relations: PRODUCTO_RELATIONS,
    });

    const rutaImage = producto.imagen.replace(`${process.env.RUTA_ESTATICOS}`, `${process.env.RUTA_FISICA}/`);

    await this.imageService.deleteImage(rutaImage);

    await this.productoRepository.update(idProducto, { imagen: null });

    return true;
  }
}


