import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { ProductosService } from 'src/productos/service/productos.service';
import { CreatePromocionDto } from '../dto/create_promocion.dto';
import { GetCuponValidadoDto } from '../dto/get_cupon_validado.dto';
import { GetProductosPromocionDto } from '../dto/get_productos_en_promocion.dto';
import { GetPromocionDto } from '../dto/get_promocion.dto';
import { UpdatePromocionDto } from '../dto/update_promocion.dto';
import { AplanarCodigoCuponPipe } from '../pipe/aplanar-codigo-cupon.pipe';
import { ProductosSeleccionadosPipe } from '../pipe/productos-seleccionados-existen.pipe';
import { ValidarPromocionExistePipe } from '../pipe/validar-promocion-existe.pipe';
import { ValidarCrearPromocionPipe } from '../pipe/validar-crear-promocion.pipe';
import { PromocionesService } from '../service/promociones.service';
import { ValidarModificarPromocionPipe } from '../pipe/validar-modificar-promocion.pipe';
import { FiltrosPromocionesDto, GetPromocionesPaginadasDto } from '../dto/filtros_promociones.dto';

@ApiTags('Promociones')
@Controller('promociones')
export class PromocionesController {
    constructor(
        private readonly promocionesService: PromocionesService,
        @Inject(ProductosService) readonly productosService: ProductosService
    ) { }

    // Obtener todas las promociones filtradas
    @ApiOperation({
        summary: 'Obtener todas las promociones paginadas y filtradas',
        description: `Retorna todas las promociones. Permite filtrar `
            + `según tipo, rango de fechas y habilitadas/inhabilitadas.\n`
            + `- idTipoPromocion: 1: TRADICIONAL, 2: CUPON \n  - "TRADICIONAL" para descuentos `
            + `que se aplican por defecto al producto, "CUPON" para descuentos que requieren `
            + `ingresar un código para activarlos.\n`
            + `- idTipoDescuento: 1: PORCENTAJE, 2: FIJO \n  - "PORCENTAJE" cuando la propiedad `
            + `"valor" define el porcentaje que se descuenta, "FIJO" cuando define el precio final del producto.\n`
            + `- idTipoSeleccionProductos: 1: TODOS, 2: SELECCIONADOS \n  - "TODOS" si la promoción se `
            + `aplica a todos los productos o "SELECCIONADOS" si solo aplica productos seleccionados.\n`
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna todas las promociones paginadas filtradas',
        type: GetPromocionesPaginadasDto
    })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
    @ApiQuery({
        name: 'pageSize',
        required: false,
        description: 'Cantidad de elementos por página',
    })
    @Get()
    async findAll(@Query() filtrosPromocion: FiltrosPromocionesDto): Promise<GetPromocionesPaginadasDto> {
        return await this.promocionesService.findAllPaginated(filtrosPromocion)
    }

    // Obtener productos por promoción
    @ApiOperation({
        summary: 'Obtener los productos seleccinados de una promoción',
        description: `Retorna todos los productos seleccionados de una promoción `
            + `cuya propiedad "tipoSeleccionProductos" sea "SELECCIONADOS".\n`
            + `Permite definir paginación.\n`
            + `\nSi el tipo de selección de la promoción es "TODOS", se responde con {todosSeleccionados: true} `
            + `y significa que se pueden obtener los productos por medio de Catálogo.`
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
    async findSelectedProducts(
        @Param('idPromocion', ValidarPromocionExistePipe) idPromocion: number,
        @Query() filtrosCatalogoDto: PaginacionDto
    ): Promise<GetProductosPromocionDto> {
        return await this.promocionesService.findSelectedProducts(
            idPromocion,
            filtrosCatalogoDto
        )
    }

    // Validar cupón
    @ApiOperation({
        summary: 'Validar código de cupón',
        description: `Recibe un código requerido para validar un cupón.\n`
            + `\nSi se encuentra un cupón para ese código, se retorna una respuesta `
            + `positiva ("validado": true), junto con el id del cupón y el código usado para validar.\n`
            + `\nSi no se encuentra un cupón que coincida con el código,`
            + ` se retorna una respuesta negativa ("validado": false).\n`
    })
    @ApiResponse({
        status: 200,
        description: 'Comprueba si hay o no un cupón que coincida con el código ingresado',
        type: GetCuponValidadoDto
    })
    @ApiResponse({
        status: 400,
        description: 'Error al comprobar código'
    })
    @Get('coupon/:codigoPromocion')
    async validateCoupon(@Param('codigoPromocion', AplanarCodigoCuponPipe) code: string): Promise<GetCuponValidadoDto> {
        return await this.promocionesService.validateCoupon(code)
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
    async findById(
        @Param('idPromocion', ValidarPromocionExistePipe) id: number
    ): Promise<GetPromocionDto> {
        return await this.promocionesService.findById(+id)
    }

    // Crear promoción
    @ApiOperation({
        summary: 'Crear promoción',
        description: `Propiedades: \n`
            + `- codigo: Palabra requerida para activar un cupón (solo aplica a cupones). `
            + `Se eliminan automáticamente todos los espacios.\n`
            + `- valor: Descuento o precio final del producto, dependiendo si la promoción es por porcentaje o precio fijo.\n`
            + `- idTipoPromocion: 1: TRADICIONAL, 2: CUPON \n  - "TRADICIONAL" para descuentos `
            + `que se aplican por defecto al producto, "CUPON" para descuentos que requieren `
            + `ingresar un código para activarlos.\n`
            + `- idTipoDescuento: 1: PORCENTAJE, 2: FIJO \n  - "PORCENTAJE" cuando la propiedad `
            + `"valor" define el porcentaje que se descuenta, "FIJO" cuando define el precio final del producto.\n`
            + `- idTipoSeleccionProductos: 1: TODOS, 2: SELECCIONADOS \n  - "TODOS" si la promoción se `
            + `aplica a todos los productos o "SELECCIONADOS" si solo aplica productos seleccionados.\n`
            + `- idsProductos: Arreglo de id de los productos seleccinados de una promoción.\n`
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
    @UsePipes()
    @Post()
    async create(
        @Body(ValidarCrearPromocionPipe, ProductosSeleccionadosPipe) createPromocionDto: CreatePromocionDto
    ): Promise<GetPromocionDto> {
        return await this.promocionesService.create(createPromocionDto)
    }

    // Modificar promoción
    @ApiOperation({
        summary: 'Modificar una promoción',
        description: `Propiedades: \n`
            + `- codigo: Palabra requerida para activar un cupón (solo aplica a cupones). `
            + `Se eliminan automáticamente todos los espacios.\n`
            + `- valor: Descuento o precio final del producto, dependiendo si la promoción es por porcentaje o precio fijo.\n`
            + `- idTipoPromocion: 1: TRADICIONAL, 2: CUPON \n  - "TRADICIONAL" para descuentos `
            + `que se aplican por defecto al producto, "CUPON" para descuentos que requieren `
            + `ingresar un código para activarlos.\n`
            + `- idTipoDescuento: 1: PORCENTAJE, 2: FIJO \n  - "PORCENTAJE" cuando la propiedad `
            + `"valor" define el porcentaje que se descuenta, "FIJO" cuando define el precio final del producto.\n`
            + `- idTipoSeleccionProductos: 1: TODOS, 2: SELECCIONADOS \n  - "TODOS" si la promoción se `
            + `aplica a todos los productos o "SELECCIONADOS" si solo aplica productos seleccionados.\n`
            + `- productosModificados: Acciones sobre el conjunto de productos seleccionados de la promoción. `
            + `Permite agregar o remover productos asignados a una promoción.\n`
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
    @ApiResponse({
        status: 404,
        description: 'No existe la promoción'
    })
    @ApiBody({
        type: UpdatePromocionDto
    })
    @Patch(':idPromocion')
    async update(
        @Param('idPromocion', ValidarPromocionExistePipe, ValidarModificarPromocionPipe) id: number,
        @Body(ProductosSeleccionadosPipe) updatePromocionDto: UpdatePromocionDto
    ): Promise<GetPromocionDto> {
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
    async deleteById(
        @Param('idPromocion', ValidarPromocionExistePipe) id: number
    ): Promise<void> {
        return await this.promocionesService.deleteById(+id)
    }
}
