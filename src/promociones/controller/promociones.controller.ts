import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { CreatePromocionDto } from '../dto/create_promocion.dto';
import { GetProductosPromocionDto } from '../dto/get_productos_en_promocion.dto';
import { GetPromocionDto } from '../dto/get_promocion.dto';
import { UpdatePromocionDto } from '../dto/update_promocion.dto';
import { PromocionesService } from '../service/promociones.service';
import { ValidarPromocionExistePipe } from '../pipe/validar-promocion-existe.pipe';

@ApiTags('Promociones')
@Controller('promociones')
export class PromocionesController {
    constructor(private readonly promocionesService: PromocionesService) { }

    @ApiOperation({
        summary: 'Obtener todas las promociones activas'
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna todas las promociones activas',
        type: [GetPromocionDto]
    })
    @Get()
    async findAll(): Promise<GetPromocionDto[]> {
        return await this.promocionesService.findAll()
    }

    // Obtener productos por promoción
    @ApiOperation({
        summary: 'Obtener los productos paginados de una promoción'
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna los productos de una promoción',
        type: GetProductosPromocionDto
    })
    @ApiResponse({
        status: 404,
        description: 'No existe una promoción asociada a ese id'
    })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
    @ApiQuery({
        name: 'pageSize',
        required: false,
        description: 'Cantidad de elementos por página',
    })
    @Get('productos/:idPromocion')
    async findSelectedProducts(@Param('idPromocion', ValidarPromocionExistePipe) idPromocion: number, @Query() filtrosCatalogoDto: PaginacionDto): Promise<GetProductosPromocionDto> {
        return await this.promocionesService.findSelectedProducts(+idPromocion, filtrosCatalogoDto)
    }

    // Obtener promoción por id
    @ApiOperation({
        summary: 'Obtener promoción por id'
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna una promoción según su id',
        type: GetPromocionDto
    })
    @ApiResponse({
        status: 404,
        description: 'No existe una promoción con ese id',
    })
    @Get(':idPromocion')
    async findById(@Param('idPromocion', ValidarPromocionExistePipe) id: number): Promise<GetPromocionDto> {
        return await this.promocionesService.findById(+id)
    }

    // Crear promoción
    @ApiOperation({
        summary: 'Crear promoción'
    })
    @ApiResponse({
        status: 201,
        description: 'Promoción creada',
        type: GetPromocionDto
    })
    @ApiResponse({
        status: 400,
        description: 'Error al crear promoción'
    })
    @ApiBody({ type: CreatePromocionDto })
    @Post()
    async create(@Body() createPromocionDto: CreatePromocionDto): Promise<GetPromocionDto> {
        return await this.promocionesService.create(createPromocionDto)
    }

    // Modificar promocion
    @ApiOperation({
        summary: 'Modificar una promoción'
    })
    @ApiResponse({
        status: 200,
        description: 'Modificación exitosa',
        type: GetPromocionDto
    })
    @ApiResponse({
        status: 400,
        description: 'Error al modificar la promoción'
    })
    @ApiBody({
        type: UpdatePromocionDto
    })
    @Patch(':idPromocion')
    async update(@Param('idPromocion', ValidarPromocionExistePipe) id: number, @Body() updatePromocionDto: UpdatePromocionDto): Promise<GetPromocionDto> {
        return await this.promocionesService.update(id, updatePromocionDto)
    }

    // Eliminar promoción
    @ApiOperation({
        summary: 'Eliminar promoción por id'
    })
    @ApiResponse({
        status: 204,
        description: 'Eliminación exitosa. Respuesta sin contenido'
    })
    @ApiResponse({
        status: 404,
        description: 'No existe una promoción con ese id'
    })
    @HttpCode(204)
    @Delete(':idPromocion')
    async deleteById(@Param('idPromocion', ValidarPromocionExistePipe) id: number): Promise<void> {
        return await this.promocionesService.deleteById(+id)
    }

}
