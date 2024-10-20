import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medio_pago' })
export class MedioPago {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  habilitado: boolean;
}
