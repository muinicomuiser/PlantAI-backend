import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_despacho' })
export class TipoDespacho {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tipo: string;
}
