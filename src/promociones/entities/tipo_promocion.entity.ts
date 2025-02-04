import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'tipos_promociones' })
export class TipoPromocion {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tipo: string
};