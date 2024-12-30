import { Module } from '@nestjs/common';
import { ReviewsService } from './service/reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Producto, Usuario])],
  controllers: [ReviewsController],
  providers: [ReviewsService, ValidarUsuarioExistePipe, JwtService],
})
export class ReviewsModule { }
