import { PRODUCTO_RELATIONS } from 'src/productos/shared/constants/producto-relaciones';

/**Contiene las relaciones de la entidad carro. */
export const CARRO_RELATIONS = PRODUCTO_RELATIONS.map(
  (relacionProducto) => `carroProductos.producto.${relacionProducto}`,
);
