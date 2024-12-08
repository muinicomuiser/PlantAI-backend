import { OutputReviewDto } from '../dto/OutputReviewDto';
import { Review } from '../entities/review.entity';

export class ReviewMapper {
  static toDto(review: Review): OutputReviewDto {
    const dto = new OutputReviewDto();
    dto.nombreUsuario = review.usuario.nombreUsuario;
    dto.idProducto = review.idProducto;
    dto.puntuacion = review.puntuacion;
    dto.comentario = review.comentario;
    dto.fechaCreacion = review.fechaCreacion;
    return dto;
  }

  static toDtoList(reviews: Review[]): OutputReviewDto[] {
    return reviews.map((review) => this.toDto(review));
  }
}
