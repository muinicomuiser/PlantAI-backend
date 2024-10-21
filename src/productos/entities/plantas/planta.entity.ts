import { ColorProducto } from 'src/commons/entities/color.entity';
import { Producto } from '../producto.entity';
import { Especie } from './especie.entity';
import { TipoRiego } from './tipo_riego.entity';
import { Fotoperiodo } from './fotoperiodo.entity';
import { HabitoCrecimiento } from './habito_crecimiento.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'plantas' })
export class Planta {
  @PrimaryColumn()
  id_producto: number;

  @Column({ name: 'pet_friendly' })
  petFriendly: boolean;

  @Column({ name: 'tolerancia_temperatura' })
  toleranciaTemperatura: number;

  @Column()
  ciclo: boolean;

  @Column()
  altura: string;

  // Clave foránea para Especie
  @Column({ name: 'id_especie' })
  idEspecie: number;

  // Relación con la entidad Especie
  @ManyToOne(() => Especie)
  @JoinColumn({ name: 'id_especie' })
  especie: Especie;

  // Clave foránea para Color
  @Column({ name: 'id_color' })
  idColor: number;

  // Relación con la entidad Color
  @ManyToOne(() => ColorProducto)
  @JoinColumn({ name: 'id_color' })
  color: ColorProducto;

  // Clave foránea para Fotoperiodo
  @Column({ name: 'id_fotoperiodo' })
  idFotoperiodo: number;

  // Relación con la entidad Fotoperiodo
  @ManyToOne(() => Fotoperiodo)
  @JoinColumn({ name: 'id_fotoperiodo' })
  fotoperiodo: Fotoperiodo;

  // Clave foránea para TipoRiego
  @Column({ name: 'id_tipo_riego' })
  idTipoRiego: number;

  // Relación con la entidad TipoRiego
  @ManyToOne(() => TipoRiego)
  @JoinColumn({ name: 'id_tipo_riego' })
  tipoRiego: TipoRiego;

  // Clave foránea para HabitoCrecimiento
  @Column({ name: 'id_habito_crecimiento' })
  idHabitoCrecimiento: number;

  // Relación con la entidad HabitoCrecimiento
  @ManyToOne(() => HabitoCrecimiento)
  @JoinColumn({ name: 'id_habito_crecimiento' })
  habitoCrecimiento: HabitoCrecimiento;

  // Relación con la entidad Producto
  @OneToOne(() => Producto, (producto) => producto.planta)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
