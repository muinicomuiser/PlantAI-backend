import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Producto, Usuario])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
