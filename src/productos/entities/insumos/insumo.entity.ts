import { Marca } from "src/commons/entities/marca.entity";
import { Producto } from "../producto.entity";
import { TipoInsumo } from "./tipo_insumo.entity";

export class Insumo {

    /**One to One */
    producto: Producto; // Por id_producto

    /**Many to One */
    tipo_insumo: TipoInsumo; // Por id_tipo_insumo

    /**Many to One */
    marca: Marca; // por id_marca
}