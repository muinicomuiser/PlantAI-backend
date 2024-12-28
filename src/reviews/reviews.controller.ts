import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';
import { JwtUser, RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import { OutputReviewDto } from './dto/OutputReviewDto';
import { ValidarCrearReviewPipe } from './pipe/validar-crear-review.pipe';
import { ValidarProductoExistePipe } from './pipe/validar-producto-existe.pipe';
import { ReviewsService } from './service/reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @ApiOperation({
    summary: 'Crear una nueva review para un producto',
    description: 'Requiere el token de acceso del Cliente de crea la review.'
  })
  @ApiResponse({
    status: 201,
    description: 'Review creada con éxito',
    type: OutputReviewDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear la review'
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no existe'
  })
  @ApiBearerAuth('access-token')
  @Post()
  @Roles('Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createReview(
    @Body(ValidarCrearReviewPipe) createReviewDto: CreateReviewDto,
    @Req() req: Request
  ): Promise<OutputReviewDto> {
    const user: JwtUser = req['user']
    return await this.reviewsService.createReview(user, createReviewDto);
  }

  @ApiOperation({ summary: 'Obtener todas las reviews de un producto' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reviews del producto',
    schema: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(OutputReviewDto)
          }
        },
      }
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no existe'
  })
  @Get('producto/:idProducto')
  async getReviewsByProduct(
    @Param('idProducto', ParseIntPipe, ValidarProductoExistePipe) idProducto: number,
  ): Promise<GetDataDto<OutputReviewDto[]>> {
    return await this.reviewsService.getReviewsByProduct(idProducto);
  }

  /**Revisar casos de uso y roles requeridos. */
  @ApiOperation({ summary: 'Obtener todas las reviews de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reviews del usuario',
    schema: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(OutputReviewDto)
          }
        },
      }
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no existe'
  })
  @Get('usuario/:idUsuario')
  async getReviewsByUser(
    @Param('idUsuario', ValidarUsuarioExistePipe) idUsuario: number,
  ): Promise<GetDataDto<OutputReviewDto[]>> {
    return await this.reviewsService.getReviewsByUser(idUsuario);
  }
}
