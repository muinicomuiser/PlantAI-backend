import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ProductoSalidaDto } from 'src/productos/dto/producto-salida.dto';

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
    type: [ProductoSalidaDto]
  })
  @ValidateNested()
  @Type(() => ProductoSalidaDto)
  @IsOptional()
  productos?: ProductoSalidaDto[];
}
