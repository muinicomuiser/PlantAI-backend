import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_tamaño' })
export class Tamano {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'tamaño' })
  tamano: string;
}
