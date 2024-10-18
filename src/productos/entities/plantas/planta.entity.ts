import { ColorProducto } from 'src/commons/entities/color.entity';
import { Producto } from '../producto.entity';
import { Especie } from './especie.entity';
import { TipoRiego } from './tipo_riego.entity';
import { Fotoperiodo } from './fotoperiodo.entity';
import { HabitoCrecimiento } from './habito_crecimiento.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'plantas' })
export class Planta {
  pet_friendly: boolean;
  tolerancia_temperatura: number;
  ciclo: boolean;
  altura: string;

  /**One to One */
  producto: Producto; // Por id_producto

  /**Many to One */
  color: ColorProducto; // Por id_color

  /**Many to One */
  especie: Especie; // Por id_especie

  /**Many to One */
  tipo_riego: TipoRiego; // Por id_tipo_riego

  /**Many to One */
  fotoperiodo: Fotoperiodo; // Por id_fotoperiodo

  /**Many to One */
  habito_crecimiento: HabitoCrecimiento; // Por id_habito_crecimiento
}
