// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCarroCompraDto } from './create-carro-compra.dto';
// import { Producto } from 'src/productos/entities/producto.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductCarro } from './update-product-carro';

export class NoStockProductosCarroDto {
  @ApiProperty({ type: UpdateProductCarro, isArray: true })
  productosEnConflicto: UpdateProductCarro[];
}
