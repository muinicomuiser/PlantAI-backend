import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';
import { OutputReviewDto } from '../dto/OutputReviewDto';
import { Review } from '../entities/review.entity';
import { ReviewMapper } from '../mapper/reviews-mapper';
import { JwtUser } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }
  async createReview(
    user: JwtUser,
    createReviewDto: CreateReviewDto,
  ): Promise<OutputReviewDto> {

    try {
      /**Crear y guardar review */
      const { idProducto, puntuacion, comentario } = createReviewDto;
      const idUsuario: number = user.id

      const nuevaReview = this.reviewRepository.create({
        idUsuario,
        idProducto,
        puntuacion,
        comentario,
      });
      const reviewCreada: Review = await this.reviewRepository.save(nuevaReview);

      /**Calcular puntuación nueva del producto */
      const producto: Producto = await this.productoRepository.findOne({
        where: { id: idProducto }
      });

      const reviews: Review[] = await this.reviewRepository.find({
        where: { idProducto: createReviewDto.idProducto }
      });

      producto.puntuacion = reviews.reduce((acumulador, review) => acumulador + review.puntuacion, 0) / reviews.length;
      await this.productoRepository.save(producto)

      /**Retornar dto de review */
      const reviewDto: OutputReviewDto = ReviewMapper.toDto(reviewCreada);
      reviewDto.nombreUsuario = user.username
      return reviewDto;
    }
    catch (error) {
      throw new BadRequestException('Error al guardar la review')
    }
  }

  // Obtener todas las reviews de un producto
  async getReviewsByProduct(idProducto: number): Promise<GetDataDto<OutputReviewDto[]>> {
    try {
      const reviews = await this.reviewRepository.find({
        where: { idProducto },
        relations: ['usuario'],
      });
      return { totalItems: reviews.length, data: ReviewMapper.toDtoList(reviews) };
    }
    catch (error) {
      throw new BadRequestException('Error al obtener las reviews')
    }
  }
  //TODO: implementar pipe de validacion usuario
  async getReviewsByUser(idUsuario: number): Promise<GetDataDto<OutputReviewDto[]>> {
    try {
      const reviews = await this.reviewRepository.find({
        where: { idUsuario },
        relations: ['usuario'],
      });
      return { totalItems: reviews.length, data: ReviewMapper.toDtoList(reviews) };
    }
    catch (error) {
      throw new BadRequestException('Error al obtener las reviews')
    }
  }
}
