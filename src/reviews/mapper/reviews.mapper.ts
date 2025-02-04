import { OutputReviewDto } from '../dto/OutputReviewDto';
import { Review } from '../entities/review.entity';

export class ReviewMapper {
  static toDto(review: Review): OutputReviewDto {
    const reviewDto = new OutputReviewDto();
    // reviewDto.id = review.id;
    // reviewDto.idUsuario = review.idUsuario;
    reviewDto.nombreUsuario =
      review.usuario?.nombreUsuario || 'Usuario no disponible';
    // reviewDto.idProducto = review.idProducto;
    reviewDto.puntuacion = review.puntuacion;
    reviewDto.comentario = review.comentario;
    reviewDto.fechaCreacion = review.fechaCreacion;
    return reviewDto;
  }

  static toDtoList(reviews: Review[]): OutputReviewDto[] {
    return reviews.map(this.toDto);
  }
}
