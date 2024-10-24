import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'marcas' })
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
}
