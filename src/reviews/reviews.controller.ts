import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { OutputReviewDto } from './dto/OutputReviewDto';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Crear una nueva review para un producto' })
  @ApiResponse({
    status: 201,
    description: 'Review creada con éxito',
    type: Review,
  })
  @Post(':idUsuario')
  async createReview(
    @Param('idUsuario', ValidarUsuarioExistePipe) idUsuario: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.createReview(idUsuario, createReviewDto);
  }

  @ApiOperation({ summary: 'Obtener todas las reviews de un producto' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reviews del producto',
    type: [Review],
  })
  @Get('producto/:idProducto')
  async getReviewsByProduct(
    @Param('idProducto', ParseIntPipe) idProducto: number,
  ): Promise<OutputReviewDto[]> {
    return this.reviewsService.getReviewsByProduct(idProducto);
  }

  @ApiOperation({ summary: 'Obtener todas las reviews de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reviews del usuario',
    type: [OutputReviewDto],
  })
  @Get('usuario/:idUsuario')
  async getReviewsByUser(
    @Param('idUsuario', ValidarUsuarioExistePipe) idUsuario: number,
  ): Promise<OutputReviewDto[]> {
    return this.reviewsService.getReviewsByUser(idUsuario);
  }
}
