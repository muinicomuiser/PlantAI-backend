import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { OutputReviewDto } from './dto/OutputReviewDto';
import { ReviewMapper } from './mapper/reviews-mapper';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async createReview(
    idUsuario: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const { idProducto, puntuacion, comentario } = createReviewDto;
    //TODO: crear pipe de validacion de producto por id
    const producto = await this.productoRepository.findOne({
      where: { id: idProducto },
    });
    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${idProducto} no encontrado`,
      );
    }
    //TODO: Implementar pipe  Verificar que el usuario existe
    const usuario = await this.usuarioRepository.findOne({
      where: { id: idUsuario },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }
    const nuevaReview = this.reviewRepository.create({
      idUsuario,
      idProducto,
      puntuacion,
      comentario,
    });

    return this.reviewRepository.save(nuevaReview);
  }
  // Obtener todas las reviews de un producto
  async getReviewsByProduct(idProducto: number): Promise<OutputReviewDto[]> {
    const reviews = await this.reviewRepository.find({
      where: { idProducto },
      relations: ['usuario'],
    });
    return ReviewMapper.toDtoList(reviews);
  }
  //TODO: implementar pipe de validacion usuario
  async getReviewsByUser(idUsuario: number): Promise<OutputReviewDto[]> {
    const reviews = await this.reviewRepository.find({
      where: { idUsuario },
      relations: ['producto'],
    });
    return ReviewMapper.toDtoList(reviews);
  }
}
