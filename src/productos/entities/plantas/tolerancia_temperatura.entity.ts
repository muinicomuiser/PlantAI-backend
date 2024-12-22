import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plantas_tolerancia_temperatura' })
export class ToleranciaTemperatura {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'tolerancia_temperatura' })
  toleranciaTemperatura: string;
}
