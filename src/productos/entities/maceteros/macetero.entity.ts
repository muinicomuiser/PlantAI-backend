import { Producto } from '../producto.entity';
import { TipoMacetero } from './tipo_macetero.entity';
import { Entity } from "typeorm";

@Entity({ name: 'maceteros' })
export class Macetero {
  material: string;
  forma: string;
  diametro: number;

  /**One to One */
  producto: Producto; // Por id_producto

  /**Many to One */
  tipo_macetero: TipoMacetero; // Por id_tipo_macetero
}
