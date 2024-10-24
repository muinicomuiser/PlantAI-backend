import { CreateCarroCompraDto } from './create-carro-compra.dto';
declare const UpdateCarroCompraDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCarroCompraDto>>;
export declare class UpdateCarroCompraDto extends UpdateCarroCompraDto_base {
    producto: string[];
}
export {};
