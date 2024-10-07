import { FotoPeriodo, TipoRiego } from '../entities/categorias';
export declare class CreateProductoDto {
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
