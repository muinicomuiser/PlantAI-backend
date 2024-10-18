import { Categoria } from './categoria.entity';
import { Etiqueta } from './etiqueta.entity';

export class Producto {
  id: number;
  SKU: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  cantidad: number;
  unidades_vendidas: number;
  puntuacion: number;
  ancho: number;
  alto: number;
  largo: number;
  peso: number;

  /**Many to One */
  categoria: Categoria; // Por Id_categoria

  /**Many to Many */
  etiquetas: Etiqueta[];
}
