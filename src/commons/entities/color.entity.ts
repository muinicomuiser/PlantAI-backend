import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'colores_productos' })
export class ColorProducto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  color: string;
}
