import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { GetProductoDto } from 'src/productos/dto/producto/get-producto.dto';
import { CatalogoService } from '../service/catalogo.service';
import {
  FiltrosCatalogoDto,
  SearchCatalogoDto,
} from '../dto/catalogo/paginacion.dto';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';

/**Historia de Usuario 12: Visualización del catálogo*/
@ApiTags('Catálogo')
@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) { }

  // Obtener todos los productos
  @ApiOperation({ summary: 'Obtener todos los productos del catálogo, permite usar filtros' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos del catálogo',
    schema: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(GetProductoDto)
          }
        },
      }
    },
  })

  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Cantidad de elementos por página',
  })
  @Get()
  async findAll(@Query() filtrosCatalogoDto: FiltrosCatalogoDto): Promise<GetDataDto<GetProductoDto[]>> {
    return await this.catalogoService.findAll(filtrosCatalogoDto);
  }

  // obtener catalogo por search
  @ApiOperation({ summary: 'Obtener productos del catálogo según búsqueda por texto' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos del catálogo por búsqueda',
    schema: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(GetProductoDto)
          }
        },
      }
    },
  })
  @Get('search')
  async findBySearch(@Query() searchCatalogoDto: SearchCatalogoDto): Promise<GetDataDto<GetProductoDto[]>> {
    return await this.catalogoService.findBySearch(searchCatalogoDto);
  }
}
