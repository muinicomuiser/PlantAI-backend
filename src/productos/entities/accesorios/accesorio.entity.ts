import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoAccesorio } from './tipo_accesorio.entity';
import { Entity } from "typeorm";

@Entity({ name: 'accesorios' })
export class Accesorio {
  SKU: string;

  /**Many to One */
  marca: Marca; // Por id_marca

  /**Many to One */
  tipo_accesorio: TipoAccesorio; // Por id_tipo_accesorio

  /**One to One */
  producto: Producto; // Por id_producto
}
