import { CreateProductoDto } from './create-producto.dto';
declare const UpdateProductoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductoDto>>;
export declare class UpdateProductoDto extends UpdateProductoDto_base {
    nombre: string;
    precio: number;
    imagen?: string;
    descripcion?: string;
    cantidad?: number;
    familia?: string;
    fotoperiodo?: string;
    tipoRiego?: string;
    petFriendly?: boolean;
    color?: string;
}
export {};
