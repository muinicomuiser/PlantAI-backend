import { Producto } from "src/productos/entities/producto.entity";
import { CarroCompra } from "./carro-compra.entity";

export class ProductosCarro {

    /**Many to One */
    carros: CarroCompra; // Por id_carro

    /**One to Many */
    productos: Producto[]; // Por id_producto

    cantidad_producto: number;
}