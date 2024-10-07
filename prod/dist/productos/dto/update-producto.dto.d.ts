import { CreateProductoDto } from './create-producto.dto';
import { FotoPeriodo, TipoRiego } from '../entities/categorias';
declare const UpdateProductoDto_base: import('@nestjs/mapped-types').MappedType<
  Partial<CreateProductoDto>
>;
export declare class UpdateProductoDto extends UpdateProductoDto_base {
  nombre: string;
  precio: number;
  imagen?: string;
  descripcion?: string;
  cantidad?: number;
  familia?: string;
  fotoperiodo?: FotoPeriodo;
  tipoRiego?: TipoRiego;
  petFriendly?: boolean;
  color?: string;
}
export {};
