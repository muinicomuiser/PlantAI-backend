import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_entorno' })
export class Entorno {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'entorno' })
  entorno: string;
}
