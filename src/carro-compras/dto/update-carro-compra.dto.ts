import { PartialType } from '@nestjs/mapped-types';
import { CreateCarroCompraDto } from './create-carro-compra.dto';

export class UpdateCarroCompraDto extends PartialType(CreateCarroCompraDto) {}
