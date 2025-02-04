import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'tipos_descuentos' })
export class TipoDescuento {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tipo: string
};