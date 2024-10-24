import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_tipo_riego' })
export class TipoRiego {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'tipo_riego' })
  tipoRiego: string;
}
