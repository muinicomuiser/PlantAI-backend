import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_especies' })
export class Especie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  especie: string;
}
