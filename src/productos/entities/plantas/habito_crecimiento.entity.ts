import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_habito_crecimiento' })
export class HabitoCrecimiento {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  crecimiento: string;
}
