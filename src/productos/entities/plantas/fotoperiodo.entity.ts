import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_fotoperiodo' })
export class Fotoperiodo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tipo: string;
}
