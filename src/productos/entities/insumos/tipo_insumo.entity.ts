import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_insumos' })
export class TipoInsumo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'tipo_insumo' })
  tipoInsumo: string;
}
