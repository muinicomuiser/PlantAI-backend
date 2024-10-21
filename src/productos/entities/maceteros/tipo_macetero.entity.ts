import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_maceteros' })
export class TipoMacetero {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tipo: string;
}
