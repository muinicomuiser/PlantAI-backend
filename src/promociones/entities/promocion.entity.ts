import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TipoPromocion } from "./tipo_promocion.entity";
import { TipoDescuento } from "./tipo_descuento.entity";
import { TipoSeleccionProducto } from "./tipo_seleccion_producto.entity";
import { Producto } from "src/productos/entities/producto.entity";

@Entity({ name: 'promociones' })
export class Promocion {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    valor: number;
    @Column({})
    codigo?: string;
    @Column()
    habilitado: boolean;
    @Column({ name: 'fecha_inicio' })
    fechaInicio: Date;
    @Column({ name: 'fecha_termino' })
    fechaTermino: Date;
    @Column({ name: 'id_tipo_promocion' })
    idTipoPromocion: number;

    /**1: PORCENTAJE, 2: FIJO */
    @Column({ name: 'id_tipo_descuento' })
    idTipoDescuento: number;
    @Column({ name: 'id_tipo_seleccion_productos' })
    idTipoSeleccionProductos: number;

    /**Propiedad para el soft delete */
    @DeleteDateColumn({ name: 'fecha_eliminacion' })
    deletedAt?: Date;

    @ManyToOne(() => TipoPromocion)
    @JoinColumn({ name: 'id_tipo_promocion' })
    tipoPromocion: TipoPromocion;

    @ManyToOne(() => TipoDescuento)
    @JoinColumn({ name: 'id_tipo_descuento' })
    tipoDescuento: TipoDescuento;

    @ManyToOne(() => TipoSeleccionProducto)
    @JoinColumn({ name: 'id_tipo_seleccion_productos' })
    tipoSeleccionProducto: TipoSeleccionProducto;

    /**Many to Many */
    @ManyToMany(() => Producto, (producto: Producto) => producto.promociones, {
        // cascade: true,
    })
    // @JoinTable({
    //     name: 'productos_promociones', // Nombre de la tabla intermedia
    //     joinColumn: { name: 'id_promocion', referencedColumnName: 'id' }, // Columna que referencia a la entidad actual (Promocion)
    //     inverseJoinColumn: { name: 'id_producto', referencedColumnName: 'id' }, // Columna que referencia a la otra entidad (Producto)
    // })
    // @JoinTable()
    productos: Producto[];
}