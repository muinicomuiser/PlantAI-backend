import { PRODUCTO_RELATIONS } from "src/productos/shared/constants/producto-relaciones";
/**Contiene las relaciones de cada producto de un carro. */
export const CARRO_PRODUCTO_RELATIONS = PRODUCTO_RELATIONS.map(relacionProducto => `carroProductos.producto.${relacionProducto}`)