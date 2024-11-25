// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCarroCompraDto } from './create-carro-compra.dto';
// import { Producto } from 'src/productos/entities/producto.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';

import { ApiProperty } from "@nestjs/swagger";
import { UpdateProductCarro } from "./update-product-carro";
import { ValidateNested } from "class-validator";


export class UpdateContenidoCarroDto {
  @ApiProperty({ type: UpdateProductCarro, isArray: true })
  @ValidateNested()
  productosCarro: UpdateProductCarro[]
}
