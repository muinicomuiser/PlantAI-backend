import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'tipos_selecciones_productos' })
export class TipoSeleccionProducto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tipo: string
};