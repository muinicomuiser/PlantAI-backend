import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Repository } from 'typeorm';
import { ColorProducto } from 'src/commons/entities/color.entity';
import { Fotoperiodo } from '../entities/plantas/fotoperiodo.entity';
import { HabitoCrecimiento } from '../entities/plantas/habito_crecimiento.entity';
import { TipoRiego } from '../entities/plantas/tipo_riego.entity';
import { Marca } from 'src/commons/entities/marca.entity';
import { TipoMacetero } from '../entities/maceteros/tipo_macetero.entity';
import { TipoInsumo } from '../entities/insumos/tipo_insumo.entity';
import { ToleranciaTemperatura } from '../entities/plantas/tolerancia_temperatura.entity';
import { Entorno } from '../entities/plantas/entorno.entity';
import { Tamano } from '../entities/plantas/tamano.entity';
import { Iluminacion } from '../entities/plantas/iluminacion.entity';

/**Valida que los id de cada campo existan en sus rspectivas tablas. */
@Injectable()
export class ValidarPropiedadesProductoPipe implements PipeTransform {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(ColorProducto)
    private readonly colorProductoRepository: Repository<ColorProducto>,
    @InjectRepository(Fotoperiodo)
    private readonly fotoperiodoRepository: Repository<Fotoperiodo>,
    @InjectRepository(HabitoCrecimiento)
    private readonly habitoCrecimientoRepository: Repository<HabitoCrecimiento>,
    @InjectRepository(TipoRiego)
    private readonly tipoRiegoRepository: Repository<TipoRiego>,
    @InjectRepository(Entorno)
    private readonly entornoRepository: Repository<Entorno>,
    @InjectRepository(ToleranciaTemperatura)
    private readonly toleranciaTemperaturaRepository: Repository<ToleranciaTemperatura>,
    @InjectRepository(Tamano)
    private readonly tamanoRepository: Repository<Tamano>,
    @InjectRepository(Iluminacion)
    private readonly iluminacionRepository: Repository<Iluminacion>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    @InjectRepository(TipoMacetero)
    private readonly tipoMaceteroRepository: Repository<TipoMacetero>,
    @InjectRepository(TipoInsumo)
    private readonly tipoInsumoRepository: Repository<TipoInsumo>,
  ) { }
  async transform(value: any, metadata: ArgumentMetadata) {
    const updateDto: UpdateProductoDto = value as UpdateProductoDto;
    if (updateDto.idCategoria) {
      const existe: boolean = await this.categoriaRepository.existsBy({
        id: updateDto.idCategoria,
      });
      if (!existe) {
        throw new BadRequestException('La id de categoría no es válida');
      }
    }

    // PLANTA
    if (updateDto.planta) {
      if (updateDto.planta.idColor) {
        const existe: boolean = await this.colorProductoRepository.existsBy({
          id: updateDto.planta.idColor,
        });
        if (!existe) {
          throw new BadRequestException('La id de color no es válida');
        }
      }

      if (updateDto.planta.idFotoperiodo) {
        const existe: boolean = await this.fotoperiodoRepository.existsBy({
          id: updateDto.planta.idFotoperiodo,
        });
        if (!existe) {
          throw new BadRequestException('La id de fotoperíodo no es válida');
        }
      }
      if (updateDto.planta.idHabitoCrecimiento) {
        const existe: boolean = await this.habitoCrecimientoRepository.existsBy(
          { id: updateDto.planta.idHabitoCrecimiento },
        );
        if (!existe) {
          throw new BadRequestException(
            'La id de hábito de crecimiento no es válida',
          );
        }
      }
      if (updateDto.planta.idTipoRiego) {
        const existe: boolean = await this.tipoRiegoRepository.existsBy({
          id: updateDto.planta.idTipoRiego,
        });
        if (!existe) {
          throw new BadRequestException('La id de tipo riego no es válida');
        }
      }
      if (updateDto.planta.idEntorno) {
        const existe: boolean = await this.entornoRepository.existsBy({
          id: updateDto.planta.idEntorno,
        });
        if (!existe) {
          throw new BadRequestException('La id de entorno no es válida');
        }
      }
      if (updateDto.planta.idIluminacion) {
        const existe: boolean = await this.iluminacionRepository.existsBy({
          id: updateDto.planta.idIluminacion,
        });
        if (!existe) {
          throw new BadRequestException('La id de iluminación no es válida');
        }
      }
      if (updateDto.planta.idTamano) {
        const existe: boolean = await this.tamanoRepository.existsBy({
          id: updateDto.planta.idTamano,
        });
        if (!existe) {
          throw new BadRequestException('La id de tamaño no es válida');
        }
      }
      if (updateDto.planta.idToleranciaTemperatura) {
        const existe: boolean = await this.toleranciaTemperaturaRepository.existsBy({
          id: updateDto.planta.idToleranciaTemperatura,
        });
        if (!existe) {
          throw new BadRequestException('La id de tolerancia temperatura no es válida');
        }
      }
    }

    // MACETERO
    if (updateDto.macetero) {
      if (updateDto.macetero.idMarca) {
        const existe: boolean = await this.marcaRepository.existsBy({
          id: updateDto.macetero.idMarca,
        });
        if (!existe) {
          throw new BadRequestException('La id de marca no es válida');
        }
      }
      if (updateDto.macetero.idTipoMacetero) {
        const existe: boolean = await this.tipoMaceteroRepository.existsBy({
          id: updateDto.macetero.idTipoMacetero,
        });
        if (!existe) {
          throw new BadRequestException('La id de tipo macetero no es válida');
        }
      }
    }

    // ACCESORIO
    if (updateDto.accesorio) {
      if (updateDto.accesorio.idColor) {
        const existe: boolean = await this.colorProductoRepository.existsBy({
          id: updateDto.accesorio.idColor,
        });
        if (!existe) {
          throw new BadRequestException('La id de color no es válida');
        }
      }
      if (updateDto.accesorio.idMarca) {
        const existe: boolean = await this.marcaRepository.existsBy({
          id: updateDto.accesorio.idMarca,
        });
        if (!existe) {
          throw new BadRequestException('La id de marca no es válida');
        }
      }
    }

    // INSUMO
    if (updateDto.insumo) {
      if (updateDto.insumo.idMarca) {
        const existe: boolean = await this.marcaRepository.existsBy({
          id: updateDto.insumo.idMarca,
        });
        if (!existe) {
          throw new BadRequestException('La id de marca no es válida');
        }
      }
      if (updateDto.insumo.idTipoInsumo) {
        const existe: boolean = await this.tipoInsumoRepository.existsBy({
          id: updateDto.insumo.idTipoInsumo,
        });
        if (!existe) {
          throw new BadRequestException('La id de tipo insumo no es válida');
        }
      }
    }
    return value;
  }
}
