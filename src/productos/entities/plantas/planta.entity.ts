import { ColorProducto } from 'src/commons/entities/color.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Producto } from '../producto.entity';
import { Entorno } from './entorno.entity';
import { Fotoperiodo } from './fotoperiodo.entity';
import { HabitoCrecimiento } from './habito_crecimiento.entity';
import { Iluminacion } from './iluminacion.entity';
import { Tamano } from './tamano.entity';
import { TipoRiego } from './tipo_riego.entity';
import { ToleranciaTemperatura } from './tolerancia_temperatura.entity';

@Entity({ name: 'plantas' })
export class Planta {
  @PrimaryColumn({ name: 'id_producto' })
  idProducto: number;

  @Column({ name: 'pet_friendly' })
  petFriendly: boolean;

  @Column()
  ciclo: boolean;

  @Column({ name: 'id_tamaño' })
  idTamano: number;

  @Column({ name: 'id_entorno' })
  idEntorno: number;

  @Column({ name: 'id_iluminacion' })
  idIluminacion: number;

  @Column({ name: 'id_tolerancia_temperatura' })
  idToleranciaTemperatura: number;

  @Column()
  especie: string;

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
  fotoPeriodo: Fotoperiodo;

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

  @ManyToOne(() => Entorno)
  @JoinColumn({ name: 'id_entorno' })
  entorno: Entorno;

  @ManyToOne(() => Tamano)
  @JoinColumn({ name: 'id_tamaño' })
  tamano: Tamano;

  @ManyToOne(() => ToleranciaTemperatura)
  @JoinColumn({ name: 'id_tolerancia_temperatura' })
  toleranciaTemperatura: ToleranciaTemperatura;

  @ManyToOne(() => Iluminacion)
  @JoinColumn({ name: 'id_iluminacion' })
  iluminacion: Iluminacion;
}
