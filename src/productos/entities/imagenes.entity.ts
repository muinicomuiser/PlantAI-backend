import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Producto } from "./producto.entity";

@Entity({ name: 'imagenes_productos' })
export class ImagenProducto {

    @Column({ name: 'id_producto' })
    id_producto: number;

    @PrimaryColumn({ name: 'ruta' })
    ruta: string;

    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'id_producto' })
    producto: Producto

    constructor(id_producto: number, ruta: string) {
        this.id_producto = id_producto;
        this.ruta = ruta;
    }
}