import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_accesorios' })
export class TipoAccesorio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tipo: string;
}
