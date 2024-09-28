import { FotoPeriodo, TipoRiego } from '../entities/categorias';
export declare class ProductoSalidaDto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  cantidad: number;
  unidadesVendidas: number;
  puntuacion: number;
  familia: string;
  fotoperiodo: FotoPeriodo;
  tipoRiego: TipoRiego;
  petFriendly: boolean;
  color: string;
  constructor(
    nombre: string,
    precio: number,
    imagen?: string,
    descripcion?: string,
    cantidad?: number,
    familia?: string,
    fotoperiodo?: FotoPeriodo,
    tipoRiego?: TipoRiego,
    petFriendly?: boolean,
    color?: string,
  );
}
