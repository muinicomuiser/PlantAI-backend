import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';

export class CreateCarroCompraDto {
  @ApiProperty({
    name: 'idUsuario',
    description: 'Identificador del usuario',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;

  @ApiProperty({
    name: 'productos',
    description: 'Productos del carro de compras',
    type: [Producto],
    example: {
      nombre: 'Ciprés',
      precio: 5000,
      imagen: 'cotiledon.com/imagenes/cipres.jpg',
      descripcion: 'Producto ejemplo. Primera planta de la tienda',
      cantidad: 5,
      unidadesVendidas: 5,
      puntuacion: 5,
      familia: 'Conífera',
      fotoperiodo: 'dia largo',
      tipoRiego: 'regadera',
      petFriendly: true,
      color: 'verde',
      id: 1,
    },
  })
  @ValidateNested()
  @Type(() => Producto)
  @IsOptional()
  productos?: Producto[]; // pendiente de definir
}
