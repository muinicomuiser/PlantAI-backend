import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroProducto } from 'src/carro-compras/entities/carro_producto.entity';
import { DeepPartial, Repository } from 'typeorm';
import { PaginacionDto } from '../dto/catalogo/paginacion.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { GetProductosAdminDto } from '../dto/producto/get-paginacion-admin.dto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { UpdateProductImageDto } from '../dto/producto/update-product-image.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { Accesorio } from '../entities/accesorios/accesorio.entity';
import { ImagenProducto } from '../entities/imagenes.entity';
import { Insumo } from '../entities/insumos/insumo.entity';
import { Macetero } from '../entities/maceteros/macetero.entity';
import { Planta } from '../entities/plantas/planta.entity';
import { Producto } from '../entities/producto.entity';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';
import { ImageService } from './imagen.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(ImagenProducto)
    private readonly imagenProductoRepository: Repository<ImagenProducto>,
    @InjectRepository(CarroProducto)
    private readonly carroProductoRepository: Repository<CarroProducto>,
    private readonly imageService: ImageService,
  ) { }

  /**Retorna el producto cuyo id coincida con el ingresado.*/
  async getById(id: number): Promise<GetProductoDto> {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
      relations: PRODUCTO_RELATIONS,
    });
    if (!producto) {
      throw new NotFoundException('No existe un producto con ese id.');
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

  // Crear producto
  async create(createProductoDto: CreateProductoDto): Promise<GetProductoDto> {
    let imagenNueva: string = null;
    if (createProductoDto.imagen) {
      imagenNueva = createProductoDto.imagen;
      createProductoDto.imagen = null;
    }
    try {
      const nuevoProducto = await this.productoRepository.manager.transaction(
        async (transactionalEM) => {
          const producto: Producto = Object.assign(
            new Producto(),
            createProductoDto,
          );
          const productoGuardado = await transactionalEM.save(producto);

          const productoId = productoGuardado.id;
          if (createProductoDto.planta) {
            const planta: Planta = Object.assign(
              new Planta(),
              createProductoDto.planta,
            );
            planta.idProducto = productoId;
            productoGuardado.planta = await transactionalEM.save(planta);
          }
          if (createProductoDto.macetero) {
            const macetero: Macetero = Object.assign(
              new Macetero(),
              createProductoDto.macetero,
            );
            macetero.idProducto = productoId;
            productoGuardado.macetero = await transactionalEM.save(macetero);
          }
          if (createProductoDto.insumo) {
            const insumo: Insumo = Object.assign(
              new Insumo(),
              createProductoDto.insumo,
            );
            insumo.idProducto = productoId;
            productoGuardado.insumo = await transactionalEM.save(insumo);
          }
          if (createProductoDto.accesorio) {
            const accesorio: Accesorio = Object.assign(
              new Accesorio(),
              createProductoDto.accesorio,
            );
            accesorio.idProducto = productoId;
            productoGuardado.accesorio = await transactionalEM.save(accesorio);
          }
          return productoGuardado;
        },
      );

      if (imagenNueva) {
        const imagenBase64: UpdateProductImageDto = new UpdateProductImageDto();
        imagenBase64.base64Content = imagenNueva;
        const rutaImagen: string = await this.addProductImage(
          imagenBase64,
          nuevoProducto.id,
        );
        const nuevaImagen: ImagenProducto = new ImagenProducto(nuevoProducto.id, rutaImagen)
        if (nuevoProducto.imagenes) {
          nuevoProducto.imagenes.push(nuevaImagen);
        }
        else {
          nuevoProducto.imagenes = [nuevaImagen]
        }
      } else {
        nuevoProducto.imagenes = null;
      }
      return await this.getById(nuevoProducto.id);
    } catch (error) {
      throw new BadRequestException('Error al crear producto');
    }
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
    await this.getById(id);
    // if (updateProductoDto.imagen) {
    //   const imagenBase64: UpdateProductImageDto = new UpdateProductImageDto();
    //   imagenBase64.base64Content = updateProductoDto.imagen;
    //   updateProductoDto.imagen = await this.updateProductImage(
    //     imagenBase64,
    //     id,
    //   );
    // }
    const updateProducto = await this.productoRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const producto = await transactionalEntityManager.findOne(Producto, {
          where: { id: id },
          relations: PRODUCTO_RELATIONS,
        });
        transactionalEntityManager.merge(
          Producto,
          producto,
          updateProductoDto as DeepPartial<Producto>,
        );
        if (updateProductoDto.planta) {
          await transactionalEntityManager.update(
            Planta,
            producto.planta.idProducto,
            updateProductoDto.planta as Planta,
          );
        }
        if (updateProductoDto.macetero) {
          transactionalEntityManager.update(
            Macetero,
            producto.macetero.idProducto,
            updateProductoDto.macetero as Macetero,
          );
        }
        if (updateProductoDto.insumo) {
          transactionalEntityManager.update(
            Insumo,
            producto.insumo.idProducto,
            updateProductoDto.insumo as Insumo,
          );
        }
        if (updateProductoDto.accesorio) {
          transactionalEntityManager.update(
            Accesorio,
            producto.accesorio.idProducto,
            updateProductoDto.accesorio as Accesorio,
          );
        }
        return await transactionalEntityManager.save(producto);
      },
    );

    return await this.getById(updateProducto.id);
  }

  /**Elimina un producto según su id */
  async deleteOne(idProducto: number): Promise<GetProductoDto> {
    try {

      const producto = await this.productoRepository.findOne({
        where: { id: idProducto },
        relations: PRODUCTO_RELATIONS,
      });
      await this.productoRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.delete(CarroProducto, {
            idProducto: idProducto,
          });
          await transactionalEntityManager.delete('productos_etiquetas', {
            id_producto: idProducto,
          });
          if (producto.planta) {
            await transactionalEntityManager.delete(
              Planta,
              producto.planta.idProducto,
            );
          }
          if (producto.macetero) {
            await transactionalEntityManager.delete(
              Macetero,
              producto.macetero.idProducto,
            );
          }
          if (producto.insumo) {
            await transactionalEntityManager.delete(
              Insumo,
              producto.insumo.idProducto,
            );
          }
          if (producto.accesorio) {
            await transactionalEntityManager.delete(
              Accesorio,
              producto.accesorio.idProducto,
            );
          }
          if (producto.imagenes) {
            if (producto.imagenes.length > 0) {
              await transactionalEntityManager.delete(
                ImagenProducto,
                producto.imagenes,
              );
            }
          }
          await transactionalEntityManager.delete(Producto, idProducto);
        },
      );
      if (producto.imagenes) {
        if (producto.imagenes.length > 0) {
          await Promise.all(producto.imagenes.map(async imagen => {
            const rutaImage = this.reemplazarRutaEstaticoAFisico(imagen.ruta)
            await this.imageService.deleteImage(rutaImage);
          }))
        }
      }
      return ProductoMapper.entityToDto(producto);
    }
    catch (error) {
      throw new BadRequestException('Error al eliminar producto')
    }
  }

  /**Subir una imagen en Base64; guardar ruta en DB y SV estáticos*/
  async addProductImage(
    base64Content: UpdateProductImageDto,
    idProducto: number,
  ) {
    const rutaImagen = await this.imageService.addImage(
      base64Content.base64Content,
    );
    const nuevaImagen: ImagenProducto = new ImagenProducto(idProducto, rutaImagen)
    await this.imagenProductoRepository.save(nuevaImagen)

    return rutaImagen;
  }

  //********************************UPDATE*********************************** */
  /**Actualiza una imagen en Base64; guardar ruta en DB y SV estáticos*/
  // async updateProductImage(
  //   base64Content: UpdateProductImageDto,
  //   idProducto: number,
  // ) {
  //   try {
  //     const producto = await this.productoRepository.findOne({
  //       where: { id: idProducto },
  //       relations: PRODUCTO_RELATIONS,
  //     });

  //     //reemplaza la ruta de la db por la ruta de la carpeta física
  //     if (!producto.imagen) {
  //       return this.addProductImage(base64Content, idProducto);
  //     } else {
  //       const rutaArchivoActual = producto.imagen.replace(
  //         `${process.env.RUTA_ESTATICOS}`,
  //         `${process.env.RUTA_FISICA}/`,
  //       );
  //       //actualiza la imagen en la carpeta física
  //       const rutaImagen = await this.imageService.updateImage(
  //         base64Content.base64Content,
  //         rutaArchivoActual,
  //       );

  //       //actualiza la ruta de la imagen en la db
  //       await this.productoRepository.update(idProducto, {
  //         imagen: rutaImagen,
  //       });

  //       return rutaImagen;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException('Error al actualizar imagen');
  //   }
  // }

  /**Elimina una imagen de un producto en Base64; borra la ruta de DB y el archivo de la ruta de estáticos*/
  async deleteProductImage(idProducto: number, indiceImagen: number) {
    try {
      const producto = await this.productoRepository.findOne({
        where: { id: idProducto },
        relations: PRODUCTO_RELATIONS,
      });
      if (producto.imagenes.length < indiceImagen + 1 || indiceImagen < 0) {
        throw new BadRequestException('Índice inválido');
      }
      const imagenEliminada: ImagenProducto = producto.imagenes[indiceImagen]
      const rutaImage = this.reemplazarRutaEstaticoAFisico(imagenEliminada.ruta)
      await this.imageService.deleteImage(rutaImage);
      await this.imagenProductoRepository.remove(imagenEliminada)
    } catch (error) {
      throw new BadRequestException(
        error.message,
        'Error al eliminar la imagen',
      );
    }
    return true;
  }

  private reemplazarRutaEstaticoAFisico(ruta: string): string {
    const rutaImagen = ruta.replace(
      `${process.env.RUTA_ESTATICOS}`,
      `${process.env.RUTA_FISICA}/`,
    );
    return rutaImagen
  }

  /**Retorna todos los productos */
  async findAllPaginated(
    paginacionDto: PaginacionDto,
  ): Promise<GetProductosAdminDto> {
    const { page, pageSize } = paginacionDto;
    const limit = pageSize;
    const offset = (page - 1) * limit;
    const [result, totalItems] = await this.productoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: PRODUCTO_RELATIONS,
    });
    const productos = result.map((producto) =>
      ProductoMapper.entityToDto(producto),
    );

    return { data: productos, totalItems };
  }
}
