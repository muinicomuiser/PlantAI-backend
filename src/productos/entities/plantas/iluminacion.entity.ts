import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_iluminacion' })
export class Iluminacion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'iluminacion' })
  iluminacion: string;
}
